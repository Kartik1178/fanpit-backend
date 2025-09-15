import { Document, Types } from 'mongoose';
export type LoyaltyProgramDocument = LoyaltyProgram & Document;
export declare enum LoyaltyTier {
    BRONZE = "bronze",
    SILVER = "silver",
    GOLD = "gold",
    PLATINUM = "platinum",
    DIAMOND = "diamond"
}
export declare enum RewardType {
    DISCOUNT = "discount",
    FREE_HOURS = "free_hours",
    CASHBACK = "cashback",
    GIFT = "gift",
    PRIORITY_BOOKING = "priority_booking",
    EXCLUSIVE_ACCESS = "exclusive_access"
}
export declare class LoyaltyProgram {
    brand: Types.ObjectId;
    name: string;
    description: string;
    isActive: boolean;
    pointsPerDollar: number;
    pointsPerHour: number;
    pointsPerBooking: number;
    pointsPerReview: number;
    pointsPerReferral: number;
    tiers: Array<{
        tier: LoyaltyTier;
        minPoints: number;
        maxPoints?: number;
        benefits: Array<{
            type: RewardType;
            value: number;
            description: string;
            isActive: boolean;
        }>;
        multiplier: number;
        color: string;
        icon: string;
    }>;
    startDate: Date;
    endDate?: Date;
    totalMembers: number;
    totalPointsAwarded: number;
    totalRewardsRedeemed: number;
}
export declare const LoyaltyProgramSchema: import("mongoose").Schema<LoyaltyProgram, import("mongoose").Model<LoyaltyProgram, any, any, any, Document<unknown, any, LoyaltyProgram, any, {}> & LoyaltyProgram & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoyaltyProgram, Document<unknown, {}, import("mongoose").FlatRecord<LoyaltyProgram>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LoyaltyProgram> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
