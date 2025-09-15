import { LoyaltyTier, RewardType } from '../schemas/loyalty-program.schema';
export declare class CreateLoyaltyProgramDto {
    brand: string;
    name: string;
    description: string;
    isActive?: boolean;
    pointsPerDollar?: number;
    pointsPerHour?: number;
    pointsPerBooking?: number;
    pointsPerReview?: number;
    pointsPerReferral?: number;
    tiers?: LoyaltyTierDto[];
    endDate?: string;
}
export declare class LoyaltyTierDto {
    tier: LoyaltyTier;
    minPoints: number;
    maxPoints?: number;
    benefits: LoyaltyBenefitDto[];
    multiplier?: number;
    color?: string;
    icon?: string;
}
export declare class LoyaltyBenefitDto {
    type: RewardType;
    value: number;
    description: string;
    isActive?: boolean;
}
