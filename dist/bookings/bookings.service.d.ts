import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { SpaceDocument } from '../spaces/schemas/space.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';
import { LoyaltyService } from '../loyalty/loyalty.service';
export declare class BookingsService {
    private bookingModel;
    private spaceModel;
    private loyaltyService;
    constructor(bookingModel: Model<BookingDocument>, spaceModel: Model<SpaceDocument>, loyaltyService: LoyaltyService);
    create(createBookingDto: CreateBookingDto, userId: string): Promise<Booking>;
    findAll(queryDto: QueryBookingDto): Promise<{
        bookings: Booking[];
        total: number;
    }>;
    findOne(id: string): Promise<Booking>;
    findByUser(userId: string, queryDto: QueryBookingDto): Promise<{
        bookings: Booking[];
        total: number;
    }>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: string): Promise<void>;
    getAvailability(spaceId: string, date: string): Promise<{
        available: string[];
        booked: string[];
    }>;
    checkAvailability(spaceId: string, date: string, timeSlots: string[], excludeBookingId?: string): Promise<void>;
    private generateTimeSlots;
    getBookingStats(spaceId?: string): Promise<{
        totalBookings: number;
        confirmedBookings: number;
        pendingBookings: number;
        cancelledBookings: number;
        totalRevenue: number;
    }>;
    private awardLoyaltyPoints;
}
