import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LoyaltyTier, RewardType } from './loyalty-program.schema';

export type LoyaltyMemberDocument = LoyaltyMember & Document;

export enum PointsTransactionType {
  EARNED = 'earned',
  REDEEMED = 'redeemed',
  EXPIRED = 'expired',
  ADJUSTED = 'adjusted',
  BONUS = 'bonus',
}

export enum PointsSource {
  BOOKING = 'booking',
  REVIEW = 'review',
  REFERRAL = 'referral',
  BONUS = 'bonus',
  MANUAL = 'manual',
  REDEMPTION = 'redemption',
}

@Schema({ timestamps: true })
export class LoyaltyMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LoyaltyProgram', required: true })
  loyaltyProgram: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  totalPoints: number;

  @Prop({ type: Number, default: 0 })
  availablePoints: number; // Points available for redemption

  @Prop({ type: Number, default: 0 })
  lifetimePoints: number; // Total points ever earned

  @Prop({ 
    type: String, 
    enum: Object.values(LoyaltyTier), 
    default: LoyaltyTier.BRONZE 
  })
  currentTier: LoyaltyTier;

  @Prop({ type: Date, default: Date.now })
  joinedAt: Date;

  @Prop({ type: Date })
  lastActivityAt?: Date;

  @Prop({ type: Number, default: 0 })
  totalBookings: number;

  @Prop({ type: Number, default: 0 })
  totalSpent: number;

  @Prop({ type: Number, default: 0 })
  totalHours: number;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({ type: Number, default: 0 })
  totalReferrals: number;

  @Prop({ type: Number, default: 0 })
  totalRewardsRedeemed: number;

  @Prop({ type: Number, default: 0 })
  totalSavings: number; // Total amount saved through rewards

  @Prop({ 
    type: [{
      type: { type: String, enum: Object.values(PointsTransactionType), required: true },
      source: { type: String, enum: Object.values(PointsSource), required: true },
      points: { type: Number, required: true },
      description: { type: String, required: true },
      bookingId: { type: Types.ObjectId, ref: 'Booking', required: false },
      rewardId: { type: Types.ObjectId, ref: 'LoyaltyReward', required: false },
      expiresAt: { type: Date, required: false },
      metadata: { type: Object, default: {} }
    }],
    default: []
  })
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

  @Prop({ 
    type: [{
      rewardType: { type: String, enum: Object.values(RewardType), required: true },
      value: { type: Number, required: true },
      description: { type: String, required: true },
      redeemedAt: { type: Date, required: true },
      bookingId: { type: Types.ObjectId, ref: 'Booking', required: false },
      pointsUsed: { type: Number, required: true },
      isUsed: { type: Boolean, default: false },
      usedAt: { type: Date, required: false },
      expiresAt: { type: Date, required: false }
    }],
    default: []
  })
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

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date })
  deactivatedAt?: Date;

  @Prop({ type: String })
  deactivationReason?: string;

  // Tier progression tracking
  @Prop({ 
    type: [{
      tier: { type: String, enum: Object.values(LoyaltyTier), required: true },
      achievedAt: { type: Date, required: true },
      pointsAtAchievement: { type: Number, required: true }
    }],
    default: []
  })
  tierHistory: Array<{
    tier: LoyaltyTier;
    achievedAt: Date;
    pointsAtAchievement: number;
  }>;

  // Monthly statistics
  @Prop({ 
    type: {
      currentMonth: {
        pointsEarned: { type: Number, default: 0 },
        pointsRedeemed: { type: Number, default: 0 },
        bookings: { type: Number, default: 0 },
        hours: { type: Number, default: 0 },
        spent: { type: Number, default: 0 }
      },
      lastMonth: {
        pointsEarned: { type: Number, default: 0 },
        pointsRedeemed: { type: Number, default: 0 },
        bookings: { type: Number, default: 0 },
        hours: { type: Number, default: 0 },
        spent: { type: Number, default: 0 }
      }
    },
    default: {
      currentMonth: {
        pointsEarned: 0,
        pointsRedeemed: 0,
        bookings: 0,
        hours: 0,
        spent: 0
      },
      lastMonth: {
        pointsEarned: 0,
        pointsRedeemed: 0,
        bookings: 0,
        hours: 0,
        spent: 0
      }
    }
  })
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

export const LoyaltyMemberSchema = SchemaFactory.createForClass(LoyaltyMember);

// Indexes for better query performance
LoyaltyMemberSchema.index({ user: 1, brand: 1 }, { unique: true });
LoyaltyMemberSchema.index({ user: 1, isActive: 1 });
LoyaltyMemberSchema.index({ brand: 1, currentTier: 1 });
LoyaltyMemberSchema.index({ loyaltyProgram: 1, currentTier: 1 });
LoyaltyMemberSchema.index({ totalPoints: -1 });
LoyaltyMemberSchema.index({ lastActivityAt: -1 });
