import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { SendSmsOtpDto } from './dto/send-sms-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-email')
  @HttpCode(HttpStatus.OK)
  async sendEmailOtp(@Body() sendEmailOtpDto: SendEmailOtpDto) {
    try {
      const result = await this.otpService.sendEmailOtp(sendEmailOtpDto.email);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('send-sms')
  @HttpCode(HttpStatus.OK)
  async sendSmsOtp(@Body() sendSmsOtpDto: SendSmsOtpDto) {
    try {
      const result = await this.otpService.sendSmsOtp(sendSmsOtpDto.phone);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    try {
      const result = await this.otpService.verifyOtp(verifyOtpDto.otpId, verifyOtpDto.otp);
      
      if (!result.isValid) {
        throw new BadRequestException(result.message);
      }

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    try {
      const result = await this.otpService.resendOtp(resendOtpDto.otpId);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

