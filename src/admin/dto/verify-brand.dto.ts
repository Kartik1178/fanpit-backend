import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class VerifyBrandDto {
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsString()
  notes?: string;
}
