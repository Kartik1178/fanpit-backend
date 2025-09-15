import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { LoyaltyTier, RewardType } from '../schemas/loyalty-program.schema';

export class CreateLoyaltyProgramDto {
  @IsString()
  brand: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsPerDollar?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsPerHour?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsPerBooking?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsPerReview?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsPerReferral?: number = 0;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoyaltyTierDto)
  tiers?: LoyaltyTierDto[];

  @IsOptional()
  @IsString()
  endDate?: string;
}

export class LoyaltyTierDto {
  @IsEnum(LoyaltyTier)
  tier: LoyaltyTier;

  @IsNumber()
  @Min(0)
  minPoints: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPoints?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoyaltyBenefitDto)
  benefits: LoyaltyBenefitDto[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  multiplier?: number = 1.0;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}

export class LoyaltyBenefitDto {
  @IsEnum(RewardType)
  type: RewardType;

  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
