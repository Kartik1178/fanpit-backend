import { IsNotEmpty, IsString } from 'class-validator';

export class ResendOtpDto {
  @IsNotEmpty({ message: 'OTP ID is required' })
  @IsString({ message: 'OTP ID must be a string' })
  otpId: string;
}

