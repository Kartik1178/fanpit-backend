import { BookingStatus } from '../schemas/booking.schema';
export declare class QueryBookingDto {
    space?: string;
    user?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    status?: BookingStatus;
    limit?: number;
    page?: number;
}
