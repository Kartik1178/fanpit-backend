import { IsString, IsArray, IsNumber, IsOptional, IsBoolean, IsEnum, IsDateString, Min, Max } from 'class-validator';
import { BookingStatus } from '../schemas/booking.schema';

export class CreateBookingDto {
  @IsString()
  space: string;

  @IsDateString()
  date: string;

  @IsArray()
  @IsString({ each: true })
  timeSlots: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsString()
  recurringPattern?: string;

  @IsOptional()
  @IsDateString()
  recurringEndDate?: string;
}

