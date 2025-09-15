import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsEnum, IsDateString, Min, Max } from 'class-validator';
import { RewardType } from '../schemas/loyalty-program.schema';
import { RewardStatus } from '../schemas/loyalty-reward.schema';

export class CreateLoyaltyRewardDto {
  @IsString()
  brand: string;

  @IsString()
  loyaltyProgram: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(RewardType)
  type: RewardType;

  @IsNumber()
  @Min(1)
  pointsRequired: number;

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsString()
  valueType?: string = 'percentage';

  @IsOptional()
  @IsEnum(RewardStatus)
  status?: RewardStatus = RewardStatus.ACTIVE;

  @IsOptional()
  @IsNumber()
  @Min(-1)
  maxRedemptions?: number = -1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRedemptionsPerUser?: number = 1;

  @IsOptional()
  @IsDateString()
  validFrom?: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(365)
  expirationDays?: number = 30;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  applicableSpaces?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  applicableCategories?: string[] = [];

  @IsOptional()
  @IsNumber()
  @Min(0)
  minBookingAmount?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxDiscountAmount?: number = 0;

  @IsOptional()
  @IsBoolean()
  isStackable?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isExclusive?: boolean = false;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exclusiveTiers?: string[] = [];

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  termsAndConditions?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priority?: number = 0;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
