import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardType } from './loyalty-program.schema';

export type LoyaltyRewardDocument = LoyaltyReward & Document;

export enum RewardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  REDEEMED = 'redeemed',
}

@Schema({ timestamps: true })
export class LoyaltyReward {
  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LoyaltyProgram', required: true })
  loyaltyProgram: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    type: String, 
    enum: Object.values(RewardType), 
    required: true 
  })
  type: RewardType;

  @Prop({ type: Number, required: true })
  pointsRequired: number;

  @Prop({ type: Number, required: true })
  value: number; // Discount percentage, free hours, cashback amount, etc.

  @Prop({ type: String, default: 'percentage' })
  valueType: string; // percentage, fixed, hours, etc.

  @Prop({ 
    type: String, 
    enum: Object.values(RewardStatus), 
    default: RewardStatus.ACTIVE 
  })
  status: RewardStatus;

  @Prop({ type: Number, default: -1 })
  maxRedemptions: number; // -1 for unlimited

  @Prop({ type: Number, default: 0 })
  totalRedemptions: number;

  @Prop({ type: Number, default: 1 })
  maxRedemptionsPerUser: number; // Max times a user can redeem this reward

  @Prop({ type: Date })
  validFrom?: Date;

  @Prop({ type: Date })
  validUntil?: Date;

  @Prop({ type: Number, default: 30 })
  expirationDays: number; // Days after redemption before reward expires

  @Prop({ type: [String], default: [] })
  applicableSpaces: string[]; // Space IDs where this reward can be used

  @Prop({ type: [String], default: [] })
  applicableCategories: string[]; // Categories where this reward can be used

  @Prop({ type: Number, default: 0 })
  minBookingAmount: number; // Minimum booking amount to use this reward

  @Prop({ type: Number, default: 0 })
  maxDiscountAmount: number; // Maximum discount amount (for percentage discounts)

  @Prop({ type: Boolean, default: false })
  isStackable: boolean; // Can be used with other rewards

  @Prop({ type: Boolean, default: false })
  isExclusive: boolean; // Exclusive to certain tiers

  @Prop({ type: [String], default: [] })
  exclusiveTiers: string[]; // Tiers that can use this reward

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String })
  termsAndConditions?: string;

  @Prop({ type: Number, default: 0 })
  priority: number; // Higher number = higher priority in display

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  totalValueRedeemed: number; // Total value of all redemptions

  @Prop({ type: Number, default: 0 })
  totalPointsRedeemed: number; // Total points used for this reward

  // Analytics
  @Prop({ 
    type: {
      daily: { type: Number, default: 0 },
      weekly: { type: Number, default: 0 },
      monthly: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    default: {
      daily: 0,
      weekly: 0,
      monthly: 0,
      total: 0
    }
  })
  redemptionStats: {
    daily: number;
    weekly: number;
    monthly: number;
    total: number;
  };
}

export const LoyaltyRewardSchema = SchemaFactory.createForClass(LoyaltyReward);

// Indexes for better query performance
LoyaltyRewardSchema.index({ brand: 1, status: 1 });
LoyaltyRewardSchema.index({ loyaltyProgram: 1, isActive: 1 });
LoyaltyRewardSchema.index({ type: 1, status: 1 });
LoyaltyRewardSchema.index({ pointsRequired: 1 });
LoyaltyRewardSchema.index({ validFrom: 1, validUntil: 1 });
LoyaltyRewardSchema.index({ priority: -1 });
