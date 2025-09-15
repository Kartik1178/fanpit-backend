import { Document, Types } from 'mongoose';
import { RewardType } from './loyalty-program.schema';
export type LoyaltyRewardDocument = LoyaltyReward & Document;
export declare enum RewardStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    EXPIRED = "expired",
    REDEEMED = "redeemed"
}
export declare class LoyaltyReward {
    brand: Types.ObjectId;
    loyaltyProgram: Types.ObjectId;
    name: string;
    description: string;
    type: RewardType;
    pointsRequired: number;
    value: number;
    valueType: string;
    status: RewardStatus;
    maxRedemptions: number;
    totalRedemptions: number;
    maxRedemptionsPerUser: number;
    validFrom?: Date;
    validUntil?: Date;
    expirationDays: number;
    applicableSpaces: string[];
    applicableCategories: string[];
    minBookingAmount: number;
    maxDiscountAmount: number;
    isStackable: boolean;
    isExclusive: boolean;
    exclusiveTiers: string[];
    imageUrl?: string;
    termsAndConditions?: string;
    priority: number;
    isActive: boolean;
    totalValueRedeemed: number;
    totalPointsRedeemed: number;
    redemptionStats: {
        daily: number;
        weekly: number;
        monthly: number;
        total: number;
    };
}
export declare const LoyaltyRewardSchema: import("mongoose").Schema<LoyaltyReward, import("mongoose").Model<LoyaltyReward, any, any, any, Document<unknown, any, LoyaltyReward, any, {}> & LoyaltyReward & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoyaltyReward, Document<unknown, {}, import("mongoose").FlatRecord<LoyaltyReward>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LoyaltyReward> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
