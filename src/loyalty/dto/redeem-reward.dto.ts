import { IsString, IsNumber, IsOptional, IsObject, Min } from 'class-validator';

export class RedeemRewardDto {
  @IsString()
  userId: string;

  @IsString()
  rewardId: string;

  @IsOptional()
  @IsString()
  bookingId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number = 1;

  @IsOptional()
  @IsObject()
  metadata?: any;
}
