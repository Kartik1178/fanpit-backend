import { IsString, IsNumber, IsEnum, IsOptional, IsObject, Min } from 'class-validator';
import { PointsSource } from '../schemas/loyalty-member.schema';

export class EarnPointsDto {
  @IsString()
  userId: string;

  @IsString()
  brandId: string;

  @IsEnum(PointsSource)
  source: PointsSource;

  @IsNumber()
  @Min(1)
  points: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  bookingId?: string;

  @IsOptional()
  @IsObject()
  metadata?: any;
}
