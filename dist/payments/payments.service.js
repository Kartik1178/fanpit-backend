"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
let PaymentsService = class PaymentsService {
    async createOrder(amountInPaise, currency = 'INR') {
        const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZOR_PAY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZOR_PAY_PASS;
        if (!keyId || !keySecret) {
            throw new common_1.BadRequestException('Razorpay keys are not configured');
        }
        const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const body = {
            amount: amountInPaise,
            currency,
            payment_capture: 1,
        };
        const response = await globalThis.fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new common_1.BadRequestException(`Razorpay order create failed: ${response.status} ${text}`);
        }
        return response.json();
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)()
], PaymentsService);
//# sourceMappingURL=payments.service.js.map