import { OtpService } from './otp.service';
import { SendEmailOtpDto } from './dto/send-email-otp.dto';
import { SendSmsOtpDto } from './dto/send-sms-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendEmailOtp(sendEmailOtpDto: SendEmailOtpDto): Promise<{
        success: boolean;
        data: {
            otpId: string;
            message: string;
        };
    }>;
    sendSmsOtp(sendSmsOtpDto: SendSmsOtpDto): Promise<{
        success: boolean;
        data: {
            otpId: string;
            message: string;
        };
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resendOtp(resendOtpDto: ResendOtpDto): Promise<{
        success: boolean;
        data: {
            otpId: string;
            message: string;
        };
    }>;
}
