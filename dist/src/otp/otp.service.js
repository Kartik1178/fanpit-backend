"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const otp_schema_1 = require("./schemas/otp.schema");
let OtpService = OtpService_1 = class OtpService {
    constructor(otpModel) {
        this.otpModel = otpModel;
        this.logger = new common_1.Logger(OtpService_1.name);
        this.initializeEmailTransporter();
        this.initializeTwilioClient();
    }
    initializeEmailTransporter() {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            this.emailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            this.logger.log('✅ Gmail SMTP configured for email OTP');
        }
        else {
            this.emailTransporter = null;
            this.logger.warn('Email credentials not configured - using mock service');
        }
    }
    initializeTwilioClient() {
        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN &&
            process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
            this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        }
        else {
            this.logger.warn('Twilio not configured - SMS OTP will not be available');
        }
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    getOtpExpiry() {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 5);
        return expiry;
    }
    async sendEmailOtp(email) {
        try {
            const otp = this.generateOtp();
            const expiry = this.getOtpExpiry();
            const otpRecord = new this.otpModel({
                email,
                otp,
                type: 'email',
                expiresAt: expiry,
                isVerified: false,
            });
            await otpRecord.save();
            if (this.emailTransporter) {
                const mailOptions = {
                    from: process.env.EMAIL_USER || 'noreply@fanpit.com',
                    to: email,
                    subject: 'Fanpit - Email Verification OTP',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Email Verification</h2>
              <p>Your OTP for email verification is:</p>
              <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
              </div>
              <p>This OTP will expire in 10 minutes.</p>
              <p>If you didn't request this verification, please ignore this email.</p>
              <hr style="margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">This is an automated message from Fanpit.</p>
            </div>
          `,
                };
                try {
                    await this.emailTransporter.sendMail(mailOptions);
                    this.logger.log(`✅ Email OTP sent to ${email}`);
                }
                catch (emailError) {
                    this.logger.warn(`Failed to send email to ${email}, showing OTP in console:`, emailError.message);
                    console.log(`\n🎯 OTP for ${email}: ${otp}\n`);
                }
            }
            else {
                this.logger.log(`📧 MOCK EMAIL OTP for ${email}: ${otp}`);
                console.log(`\n🎯 OTP for ${email}: ${otp}\n`);
            }
            return {
                otpId: otpRecord._id.toString(),
                message: this.emailTransporter ? 'OTP sent to email successfully' : 'OTP generated (check console)',
            };
        }
        catch (error) {
            this.logger.error(`Failed to send email OTP to ${email}:`, error);
            throw new Error('Failed to send email OTP');
        }
    }
    async sendSmsOtp(phone) {
        try {
            if (!this.twilioClient) {
                throw new Error('Twilio not configured');
            }
            const otp = this.generateOtp();
            const expiry = this.getOtpExpiry();
            const otpRecord = new this.otpModel({
                phone,
                otp,
                type: 'sms',
                expiresAt: expiry,
                isVerified: false,
            });
            await otpRecord.save();
            const message = await this.twilioClient.messages.create({
                body: `Your Fanpit verification code is: ${otp}. This code expires in 10 minutes.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
            });
            this.logger.log(`SMS OTP sent to ${phone}, Message SID: ${message.sid}`);
            return {
                otpId: otpRecord._id.toString(),
                message: 'OTP sent to phone successfully',
            };
        }
        catch (error) {
            this.logger.error(`Failed to send SMS OTP to ${phone}:`, error);
            throw new Error('Failed to send SMS OTP');
        }
    }
    async verifyOtp(otpId, otp) {
        try {
            const otpRecord = await this.otpModel.findById(otpId);
            if (!otpRecord) {
                return { isValid: false, message: 'Invalid OTP ID' };
            }
            if (otpRecord.isVerified) {
                return { isValid: false, message: 'OTP already verified' };
            }
            if (new Date() > otpRecord.expiresAt) {
                return { isValid: false, message: 'OTP expired' };
            }
            if (otpRecord.otp !== otp) {
                return { isValid: false, message: 'Invalid OTP' };
            }
            otpRecord.isVerified = true;
            await otpRecord.save();
            this.logger.log(`OTP verified successfully for ${otpRecord.email || otpRecord.phone}`);
            return { isValid: true, message: 'OTP verified successfully' };
        }
        catch (error) {
            this.logger.error('Failed to verify OTP:', error);
            throw new Error('Failed to verify OTP');
        }
    }
    async resendOtp(otpId) {
        try {
            const otpRecord = await this.otpModel.findById(otpId);
            if (!otpRecord) {
                throw new Error('Invalid OTP ID');
            }
            if (otpRecord.isVerified) {
                throw new Error('OTP already verified');
            }
            const newOtp = this.generateOtp();
            const expiry = this.getOtpExpiry();
            otpRecord.otp = newOtp;
            otpRecord.expiresAt = expiry;
            await otpRecord.save();
            if (otpRecord.type === 'email') {
                return this.sendEmailOtp(otpRecord.email);
            }
            else if (otpRecord.type === 'sms') {
                return this.sendSmsOtp(otpRecord.phone);
            }
            throw new Error('Invalid OTP type');
        }
        catch (error) {
            this.logger.error('Failed to resend OTP:', error);
            throw new Error('Failed to resend OTP');
        }
    }
    async cleanupExpiredOtps() {
        try {
            const result = await this.otpModel.deleteMany({
                expiresAt: { $lt: new Date() },
            });
            this.logger.log(`Cleaned up ${result.deletedCount} expired OTPs`);
        }
        catch (error) {
            this.logger.error('Failed to cleanup expired OTPs:', error);
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OtpService);
//# sourceMappingURL=otp.service.js.map