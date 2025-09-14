import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Space', required: true })
  space: Types.ObjectId;

  @Prop({ required: true })
  date: string; // YYYY-MM-DD format

  @Prop({ 
    type: [String], 
    required: true,
    validate: {
      validator: function(timeSlots: string[]) {
        return timeSlots.length > 0;
      },
      message: 'At least one time slot must be selected'
    }
  })
  timeSlots: string[]; // Array of time slots like ["09:00", "10:00", "11:00"]

  @Prop({ required: true })
  startTime: string; // First time slot

  @Prop({ required: true })
  endTime: string; // Last time slot

  @Prop({ 
    type: String, 
    enum: Object.values(BookingStatus), 
    default: BookingStatus.PENDING 
  })
  status: BookingStatus;

  @Prop({ required: true })
  totalHours: number;

  @Prop({ required: true })
  pricePerHour: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  notes?: string;

  @Prop()
  specialRequests?: string;

  @Prop({ default: false })
  isRecurring: boolean;

  @Prop()
  recurringPattern?: string; // daily, weekly, monthly

  @Prop()
  recurringEndDate?: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  cancelledAt?: Date;

  @Prop()
  cancellationReason?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

// Indexes for better query performance
BookingSchema.index({ space: 1, date: 1 });
BookingSchema.index({ user: 1, date: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ date: 1, timeSlots: 1 });

