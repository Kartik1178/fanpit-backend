import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SendSmsOtpDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+[1-9]\d{1,14}$/, { 
    message: 'Phone number must be in international format (e.g., +1234567890)' 
  })
  phone: string;
}

