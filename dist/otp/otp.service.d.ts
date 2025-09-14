import { Model } from 'mongoose';
import { OtpDocument } from './schemas/otp.schema';
export declare class OtpService {
    private otpModel;
    private readonly logger;
    private emailTransporter;
    private twilioClient;
    constructor(otpModel: Model<OtpDocument>);
    private initializeEmailTransporter;
    private initializeTwilioClient;
    private generateOtp;
    private getOtpExpiry;
    sendEmailOtp(email: string): Promise<{
        otpId: string;
        message: string;
    }>;
    sendSmsOtp(phone: string): Promise<{
        otpId: string;
        message: string;
    }>;
    verifyOtp(otpId: string, otp: string): Promise<{
        isValid: boolean;
        message: string;
    }>;
    resendOtp(otpId: string): Promise<{
        otpId: string;
        message: string;
    }>;
    cleanupExpiredOtps(): Promise<void>;
}
