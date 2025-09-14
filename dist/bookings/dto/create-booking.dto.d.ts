export declare class CreateBookingDto {
    space: string;
    date: string;
    timeSlots: string[];
    notes?: string;
    specialRequests?: string;
    isRecurring?: boolean;
    recurringPattern?: string;
    recurringEndDate?: string;
}
