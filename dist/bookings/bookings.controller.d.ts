import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto, req: any): Promise<import("./schemas/booking.schema").Booking>;
    findAll(queryDto: QueryBookingDto): Promise<{
        bookings: import("./schemas/booking.schema").Booking[];
        total: number;
    }>;
    findMyBookings(queryDto: QueryBookingDto, req: any): Promise<{
        bookings: import("./schemas/booking.schema").Booking[];
        total: number;
    }>;
    getAvailability(spaceId: string, date: string): Promise<{
        available: string[];
        booked: string[];
    }>;
    getStats(spaceId?: string): Promise<{
        totalBookings: number;
        confirmedBookings: number;
        pendingBookings: number;
        cancelledBookings: number;
        totalRevenue: number;
    }>;
    findOne(id: string): Promise<import("./schemas/booking.schema").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("./schemas/booking.schema").Booking>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
