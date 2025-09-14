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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const otp_service_1 = require("./otp.service");
const send_email_otp_dto_1 = require("./dto/send-email-otp.dto");
const send_sms_otp_dto_1 = require("./dto/send-sms-otp.dto");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const resend_otp_dto_1 = require("./dto/resend-otp.dto");
let OtpController = class OtpController {
    constructor(otpService) {
        this.otpService = otpService;
    }
    async sendEmailOtp(sendEmailOtpDto) {
        try {
            const result = await this.otpService.sendEmailOtp(sendEmailOtpDto.email);
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async sendSmsOtp(sendSmsOtpDto) {
        try {
            const result = await this.otpService.sendSmsOtp(sendSmsOtpDto.phone);
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verifyOtp(verifyOtpDto) {
        try {
            const result = await this.otpService.verifyOtp(verifyOtpDto.otpId, verifyOtpDto.otp);
            if (!result.isValid) {
                throw new common_1.BadRequestException(result.message);
            }
            return {
                success: true,
                message: result.message,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message);
        }
    }
    async resendOtp(resendOtpDto) {
        try {
            const result = await this.otpService.resendOtp(resendOtpDto.otpId);
            return {
                success: true,
                data: result,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.OtpController = OtpController;
__decorate([
    (0, common_1.Post)('send-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_otp_dto_1.SendEmailOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "sendEmailOtp", null);
__decorate([
    (0, common_1.Post)('send-sms'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_sms_otp_dto_1.SendSmsOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "sendSmsOtp", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('resend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_dto_1.ResendOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "resendOtp", null);
exports.OtpController = OtpController = __decorate([
    (0, common_1.Controller)('otp'),
    __metadata("design:paramtypes", [otp_service_1.OtpService])
], OtpController);
//# sourceMappingURL=otp.controller.js.map