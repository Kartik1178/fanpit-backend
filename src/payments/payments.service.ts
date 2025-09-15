import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async createOrder(amountInPaise: number, currency: string = 'INR'): Promise<any> {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZOR_PAY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZOR_PAY_PASS;

    if (!keyId || !keySecret) {
      throw new BadRequestException('Razorpay keys are not configured');
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const body = {
      amount: amountInPaise,
      currency,
      payment_capture: 1,
    };

    const response = await (globalThis as any).fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new BadRequestException(`Razorpay order create failed: ${response.status} ${text}`);
    }

    return response.json();
  }
}


