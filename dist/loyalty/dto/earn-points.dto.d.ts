import { PointsSource } from '../schemas/loyalty-member.schema';
export declare class EarnPointsDto {
    userId: string;
    brandId: string;
    source: PointsSource;
    points: number;
    description: string;
    bookingId?: string;
    metadata?: any;
}
