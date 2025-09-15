import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Intentionally public: Razorpay order creation should be server-side, but doesn't require user auth
  @Post('create-order')
  async createOrder(@Body() body: { amount: number; currency?: string }) {
    const amountInPaise = Math.round((body.amount || 0) * 100);
    const order = await this.paymentsService.createOrder(amountInPaise, body.currency || 'INR');
    return order;
  }
}


