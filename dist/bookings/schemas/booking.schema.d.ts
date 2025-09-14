import { Document, Types } from 'mongoose';
export type BookingDocument = Booking & Document;
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare class Booking {
    user: Types.ObjectId;
    space: Types.ObjectId;
    date: string;
    timeSlots: string[];
    startTime: string;
    endTime: string;
    status: BookingStatus;
    totalHours: number;
    pricePerHour: number;
    totalAmount: number;
    notes?: string;
    specialRequests?: string;
    isRecurring: boolean;
    recurringPattern?: string;
    recurringEndDate?: string;
    isActive: boolean;
    cancelledAt?: Date;
    cancellationReason?: string;
}
export declare const BookingSchema: import("mongoose").Schema<Booking, import("mongoose").Model<Booking, any, any, any, Document<unknown, any, Booking, any, {}> & Booking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Booking, Document<unknown, {}, import("mongoose").FlatRecord<Booking>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Booking> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
