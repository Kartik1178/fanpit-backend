"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const booking_schema_1 = require("./schemas/booking.schema");
const space_schema_1 = require("../spaces/schemas/space.schema");
let BookingsService = class BookingsService {
    constructor(bookingModel, spaceModel) {
        this.bookingModel = bookingModel;
        this.spaceModel = spaceModel;
    }
    async create(createBookingDto, userId) {
        const { space, date, timeSlots, notes, specialRequests, isRecurring, recurringPattern, recurringEndDate } = createBookingDto;
        const spaceDoc = await this.spaceModel.findById(space);
        if (!spaceDoc) {
            throw new common_1.NotFoundException('Space not found');
        }
        await this.checkAvailability(space, date, timeSlots);
        const totalHours = timeSlots.length;
        const pricePerHour = spaceDoc.pricePerHour;
        const totalAmount = totalHours * pricePerHour;
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
            status: booking_schema_1.BookingStatus.PENDING,
        });
        return await booking.save();
    }
    async findAll(queryDto) {
        const { space, user, date, startDate, endDate, status, limit = 10, page = 0 } = queryDto;
        const filter = {};
        if (space)
            filter.space = space;
        if (user)
            filter.user = user;
        if (date)
            filter.date = date;
        if (status)
            filter.status = status;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate)
                filter.date.$gte = startDate;
            if (endDate)
                filter.date.$lte = endDate;
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
    async findOne(id) {
        const booking = await this.bookingModel
            .findById(id)
            .populate('user', 'firstName lastName email')
            .populate('space', 'name location pricePerHour')
            .exec();
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async findByUser(userId, queryDto) {
        return this.findAll({ ...queryDto, user: userId });
    }
    async update(id, updateBookingDto) {
        const booking = await this.bookingModel.findById(id);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if ('timeSlots' in updateBookingDto && 'date' in updateBookingDto &&
            updateBookingDto.timeSlots && updateBookingDto.date) {
            await this.checkAvailability(booking.space.toString(), updateBookingDto.date, updateBookingDto.timeSlots, id);
        }
        Object.assign(booking, updateBookingDto);
        if (updateBookingDto.status === booking_schema_1.BookingStatus.CANCELLED) {
            booking.cancelledAt = new Date();
        }
        return await booking.save();
    }
    async remove(id) {
        const result = await this.bookingModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('Booking not found');
        }
    }
    async getAvailability(spaceId, date) {
        const space = await this.spaceModel.findById(spaceId);
        if (!space) {
            throw new common_1.NotFoundException('Space not found');
        }
        const allTimeSlots = this.generateTimeSlots(space.operatingHours);
        const existingBookings = await this.bookingModel.find({
            space: spaceId,
            date,
            status: { $in: [booking_schema_1.BookingStatus.CONFIRMED, booking_schema_1.BookingStatus.PENDING] }
        });
        const bookedSlots = new Set();
        existingBookings.forEach(booking => {
            booking.timeSlots.forEach(slot => bookedSlots.add(slot));
        });
        const available = allTimeSlots.filter(slot => !bookedSlots.has(slot));
        const booked = Array.from(bookedSlots);
        return { available, booked };
    }
    async checkAvailability(spaceId, date, timeSlots, excludeBookingId) {
        const { available } = await this.getAvailability(spaceId, date);
        const unavailableSlots = timeSlots.filter(slot => !available.includes(slot));
        if (unavailableSlots.length > 0) {
            throw new common_1.ConflictException(`Time slots ${unavailableSlots.join(', ')} are not available`);
        }
    }
    generateTimeSlots(operatingHours) {
        const slots = [];
        const [openHour, openMin] = operatingHours.open.split(':').map(Number);
        const [closeHour, closeMin] = operatingHours.close.split(':').map(Number);
        const openMinutes = openHour * 60 + openMin;
        const closeMinutes = closeHour * 60 + closeMin;
        for (let minutes = openMinutes; minutes < closeMinutes; minutes += 60) {
            const hour = Math.floor(minutes / 60);
            const min = minutes % 60;
            const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
            slots.push(timeString);
        }
        return slots;
    }
    async getBookingStats(spaceId) {
        const filter = spaceId ? { space: spaceId } : {};
        const [totalBookings, confirmedBookings, pendingBookings, cancelledBookings, revenueData] = await Promise.all([
            this.bookingModel.countDocuments(filter),
            this.bookingModel.countDocuments({ ...filter, status: booking_schema_1.BookingStatus.CONFIRMED }),
            this.bookingModel.countDocuments({ ...filter, status: booking_schema_1.BookingStatus.PENDING }),
            this.bookingModel.countDocuments({ ...filter, status: booking_schema_1.BookingStatus.CANCELLED }),
            this.bookingModel.aggregate([
                { $match: { ...filter, status: booking_schema_1.BookingStatus.CONFIRMED } },
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(1, (0, mongoose_1.InjectModel)(space_schema_1.Space.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map