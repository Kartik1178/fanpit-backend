import { Document, Types } from 'mongoose';
import { LoyaltyTier, RewardType } from './loyalty-program.schema';
export type LoyaltyMemberDocument = LoyaltyMember & Document;
export declare enum PointsTransactionType {
    EARNED = "earned",
    REDEEMED = "redeemed",
    EXPIRED = "expired",
    ADJUSTED = "adjusted",
    BONUS = "bonus"
}
export declare enum PointsSource {
    BOOKING = "booking",
    REVIEW = "review",
    REFERRAL = "referral",
    BONUS = "bonus",
    MANUAL = "manual",
    REDEMPTION = "redemption"
}
export declare class LoyaltyMember {
    user: Types.ObjectId;
    brand: Types.ObjectId;
    loyaltyProgram: Types.ObjectId;
    totalPoints: number;
    availablePoints: number;
    lifetimePoints: number;
    currentTier: LoyaltyTier;
    joinedAt: Date;
    lastActivityAt?: Date;
    totalBookings: number;
    totalSpent: number;
    totalHours: number;
    totalReviews: number;
    totalReferrals: number;
    totalRewardsRedeemed: number;
    totalSavings: number;
    pointsHistory: Array<{
        type: PointsTransactionType;
        source: PointsSource;
        points: number;
        description: string;
        bookingId?: Types.ObjectId;
        rewardId?: Types.ObjectId;
        expiresAt?: Date;
        metadata: any;
    }>;
    rewardsHistory: Array<{
        rewardType: RewardType;
        value: number;
        description: string;
        redeemedAt: Date;
        bookingId?: Types.ObjectId;
        pointsUsed: number;
        isUsed: boolean;
        usedAt?: Date;
        expiresAt?: Date;
    }>;
    isActive: boolean;
    deactivatedAt?: Date;
    deactivationReason?: string;
    tierHistory: Array<{
        tier: LoyaltyTier;
        achievedAt: Date;
        pointsAtAchievement: number;
    }>;
    monthlyStats: {
        currentMonth: {
            pointsEarned: number;
            pointsRedeemed: number;
            bookings: number;
            hours: number;
            spent: number;
        };
        lastMonth: {
            pointsEarned: number;
            pointsRedeemed: number;
            bookings: number;
            hours: number;
            spent: number;
        };
    };
}
export declare const LoyaltyMemberSchema: import("mongoose").Schema<LoyaltyMember, import("mongoose").Model<LoyaltyMember, any, any, any, Document<unknown, any, LoyaltyMember, any, {}> & LoyaltyMember & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoyaltyMember, Document<unknown, {}, import("mongoose").FlatRecord<LoyaltyMember>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<LoyaltyMember> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
