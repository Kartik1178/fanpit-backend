import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from './schemas/booking.schema';
import { Space, SpaceDocument } from '../spaces/schemas/space.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking> {
    const { space, date, timeSlots, notes, specialRequests, isRecurring, recurringPattern, recurringEndDate } = createBookingDto;

    // Verify space exists
    const spaceDoc = await this.spaceModel.findById(space);
    if (!spaceDoc) {
      throw new NotFoundException('Space not found');
    }

    // Check availability
    await this.checkAvailability(space, date, timeSlots);

    // Calculate pricing
    const totalHours = timeSlots.length;
    const pricePerHour = spaceDoc.pricePerHour;
    const totalAmount = totalHours * pricePerHour;

    // Create booking
    const booking = new this.bookingModel({
      user: userId,
      space,
      date,
      timeSlots,
      startTime: timeSlots[0],
      endTime: timeSlots[timeSlots.length - 1],
      totalHours,
      pricePerHour,
      totalAmount,
      notes,
      specialRequests,
      isRecurring,
      recurringPattern,
      recurringEndDate,
      status: BookingStatus.PENDING,
    });

    return await booking.save();
  }

  async findAll(queryDto: QueryBookingDto): Promise<{ bookings: Booking[]; total: number }> {
    const { space, user, date, startDate, endDate, status, limit = 10, page = 0 } = queryDto;
    
    const filter: any = {};
    
    if (space) filter.space = space;
    if (user) filter.user = user;
    if (date) filter.date = date;
    if (status) filter.status = status;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = startDate;
      if (endDate) filter.date.$lte = endDate;
    }

    const bookings = await this.bookingModel
      .find(filter)
      .populate('user', 'firstName lastName email')
      .populate('space', 'name location pricePerHour')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page * limit)
      .exec();

    const total = await this.bookingModel.countDocuments(filter);

    return { bookings, total };
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel
      .findById(id)
      .populate('user', 'firstName lastName email')
      .populate('space', 'name location pricePerHour')
      .exec();

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByUser(userId: string, queryDto: QueryBookingDto): Promise<{ bookings: Booking[]; total: number }> {
    return this.findAll({ ...queryDto, user: userId });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingModel.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // If updating time slots, check availability
    if ('timeSlots' in updateBookingDto && 'date' in updateBookingDto && 
        updateBookingDto.timeSlots && updateBookingDto.date) {
      await this.checkAvailability(
        booking.space.toString(),
        updateBookingDto.date as string,
        updateBookingDto.timeSlots as string[],
        id // Exclude current booking from availability check
      );
    }

    Object.assign(booking, updateBookingDto);
    
    if (updateBookingDto.status === BookingStatus.CANCELLED) {
      booking.cancelledAt = new Date();
    }

    return await booking.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Booking not found');
    }
  }

  async getAvailability(spaceId: string, date: string): Promise<{ available: string[]; booked: string[] }> {
    // Get space details
    const space = await this.spaceModel.findById(spaceId);
    if (!space) {
      throw new NotFoundException('Space not found');
    }

    // Generate all possible time slots for the space
    const allTimeSlots = this.generateTimeSlots(space.operatingHours);

    // Get existing bookings for the date
    const existingBookings = await this.bookingModel.find({
      space: spaceId,
      date,
      status: { $in: [BookingStatus.CONFIRMED, BookingStatus.PENDING] }
    });

    // Extract booked time slots
    const bookedSlots = new Set<string>();
    existingBookings.forEach(booking => {
      booking.timeSlots.forEach(slot => bookedSlots.add(slot));
    });

    // Calculate available slots
    const available = allTimeSlots.filter(slot => !bookedSlots.has(slot));
    const booked = Array.from(bookedSlots);

    return { available, booked };
  }

  async checkAvailability(spaceId: string, date: string, timeSlots: string[], excludeBookingId?: string): Promise<void> {
    const { available } = await this.getAvailability(spaceId, date);
    
    // Check if all requested slots are available
    const unavailableSlots = timeSlots.filter(slot => !available.includes(slot));
    
    if (unavailableSlots.length > 0) {
      throw new ConflictException(`Time slots ${unavailableSlots.join(', ')} are not available`);
    }
  }

  private generateTimeSlots(operatingHours: { open: string; close: string }): string[] {
    const slots: string[] = [];
    const [openHour, openMin] = operatingHours.open.split(':').map(Number);
    const [closeHour, closeMin] = operatingHours.close.split(':').map(Number);
    
    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;
    
    // Generate 1-hour slots
    for (let minutes = openMinutes; minutes < closeMinutes; minutes += 60) {
      const hour = Math.floor(minutes / 60);
      const min = minutes % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
    
    return slots;
  }

  async getBookingStats(spaceId?: string): Promise<{
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
  }> {
    const filter = spaceId ? { space: spaceId } : {};
    
    const [
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      revenueData
    ] = await Promise.all([
      this.bookingModel.countDocuments(filter),
      this.bookingModel.countDocuments({ ...filter, status: BookingStatus.CONFIRMED }),
      this.bookingModel.countDocuments({ ...filter, status: BookingStatus.PENDING }),
      this.bookingModel.countDocuments({ ...filter, status: BookingStatus.CANCELLED }),
      this.bookingModel.aggregate([
        { $match: { ...filter, status: BookingStatus.CONFIRMED } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
      ])
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    return {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue,
    };
  }
}
