import { RewardType } from '../schemas/loyalty-program.schema';
import { RewardStatus } from '../schemas/loyalty-reward.schema';
export declare class CreateLoyaltyRewardDto {
    brand: string;
    loyaltyProgram: string;
    name: string;
    description: string;
    type: RewardType;
    pointsRequired: number;
    value: number;
    valueType?: string;
    status?: RewardStatus;
    maxRedemptions?: number;
    maxRedemptionsPerUser?: number;
    validFrom?: string;
    validUntil?: string;
    expirationDays?: number;
    applicableSpaces?: string[];
    applicableCategories?: string[];
    minBookingAmount?: number;
    maxDiscountAmount?: number;
    isStackable?: boolean;
    isExclusive?: boolean;
    exclusiveTiers?: string[];
    imageUrl?: string;
    termsAndConditions?: string;
    priority?: number;
    isActive?: boolean;
}
