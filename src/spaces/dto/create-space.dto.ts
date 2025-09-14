import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, IsObject, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}

export class OperatingHoursDto {
  @IsString()
  open: string; // e.g., "09:00"

  @IsString()
  close: string; // e.g., "18:00"
}

export class CreateSpaceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsString()
  brand: string; // Brand ID

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsNumber()
  @Min(0)
  pricePerHour: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => OperatingHoursDto)
  operatingHours?: OperatingHoursDto;

  @IsOptional()
  @IsObject()
  peakPricing?: Record<string, number>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  category?: string;
}


