import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(body: {
        amount: number;
        currency?: string;
    }): Promise<any>;
}
