import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LoyaltyProgramDocument = LoyaltyProgram & Document;

export enum LoyaltyTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond',
}

export enum RewardType {
  DISCOUNT = 'discount',
  FREE_HOURS = 'free_hours',
  CASHBACK = 'cashback',
  GIFT = 'gift',
  PRIORITY_BOOKING = 'priority_booking',
  EXCLUSIVE_ACCESS = 'exclusive_access',
}

@Schema({ timestamps: true })
export class LoyaltyProgram {
  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  pointsPerDollar: number; // Points earned per dollar spent

  @Prop({ type: Number, default: 0 })
  pointsPerHour: number; // Points earned per hour booked

  @Prop({ type: Number, default: 0 })
  pointsPerBooking: number; // Points earned per booking

  @Prop({ type: Number, default: 0 })
  pointsPerReview: number; // Points earned per review

  @Prop({ type: Number, default: 0 })
  pointsPerReferral: number; // Points earned per referral

  @Prop({ 
    type: [{
      tier: { type: String, enum: Object.values(LoyaltyTier), required: true },
      minPoints: { type: Number, required: true },
      maxPoints: { type: Number, required: false },
      benefits: [{
        type: { type: String, enum: Object.values(RewardType), required: true },
        value: { type: Number, required: true },
        description: { type: String, required: true },
        isActive: { type: Boolean, default: true }
      }],
      multiplier: { type: Number, default: 1.0 }, // Points multiplier for this tier
      color: { type: String, default: '#8B4513' }, // Tier color for UI
      icon: { type: String, default: 'medal' } // Tier icon for UI
    }],
    default: [
      {
        tier: LoyaltyTier.BRONZE,
        minPoints: 0,
        maxPoints: 999,
        benefits: [
          {
            type: RewardType.DISCOUNT,
            value: 5,
            description: '5% discount on all bookings',
            isActive: true
          }
        ],
        multiplier: 1.0,
        color: '#CD7F32',
        icon: 'medal'
      },
      {
        tier: LoyaltyTier.SILVER,
        minPoints: 1000,
        maxPoints: 4999,
        benefits: [
          {
            type: RewardType.DISCOUNT,
            value: 10,
            description: '10% discount on all bookings',
            isActive: true
          },
          {
            type: RewardType.PRIORITY_BOOKING,
            value: 1,
            description: 'Priority booking access',
            isActive: true
          }
        ],
        multiplier: 1.2,
        color: '#C0C0C0',
        icon: 'star'
      },
      {
        tier: LoyaltyTier.GOLD,
        minPoints: 5000,
        maxPoints: 14999,
        benefits: [
          {
            type: RewardType.DISCOUNT,
            value: 15,
            description: '15% discount on all bookings',
            isActive: true
          },
          {
            type: RewardType.FREE_HOURS,
            value: 2,
            description: '2 free hours per month',
            isActive: true
          },
          {
            type: RewardType.PRIORITY_BOOKING,
            value: 1,
            description: 'Priority booking access',
            isActive: true
          }
        ],
        multiplier: 1.5,
        color: '#FFD700',
        icon: 'crown'
      },
      {
        tier: LoyaltyTier.PLATINUM,
        minPoints: 15000,
        maxPoints: 49999,
        benefits: [
          {
            type: RewardType.DISCOUNT,
            value: 20,
            description: '20% discount on all bookings',
            isActive: true
          },
          {
            type: RewardType.FREE_HOURS,
            value: 5,
            description: '5 free hours per month',
            isActive: true
          },
          {
            type: RewardType.CASHBACK,
            value: 5,
            description: '5% cashback on all bookings',
            isActive: true
          },
          {
            type: RewardType.EXCLUSIVE_ACCESS,
            value: 1,
            description: 'Exclusive access to premium spaces',
            isActive: true
          }
        ],
        multiplier: 2.0,
        color: '#E5E4E2',
        icon: 'gem'
      },
      {
        tier: LoyaltyTier.DIAMOND,
        minPoints: 50000,
        benefits: [
          {
            type: RewardType.DISCOUNT,
            value: 25,
            description: '25% discount on all bookings',
            isActive: true
          },
          {
            type: RewardType.FREE_HOURS,
            value: 10,
            description: '10 free hours per month',
            isActive: true
          },
          {
            type: RewardType.CASHBACK,
            value: 10,
            description: '10% cashback on all bookings',
            isActive: true
          },
          {
            type: RewardType.EXCLUSIVE_ACCESS,
            value: 1,
            description: 'Exclusive access to premium spaces',
            isActive: true
          },
          {
            type: RewardType.GIFT,
            value: 1,
            description: 'Monthly surprise gift',
            isActive: true
          }
        ],
        multiplier: 3.0,
        color: '#B9F2FF',
        icon: 'diamond'
      }
    ]
  })
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

  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @Prop()
  endDate?: Date;

  @Prop({ type: Number, default: 0 })
  totalMembers: number;

  @Prop({ type: Number, default: 0 })
  totalPointsAwarded: number;

  @Prop({ type: Number, default: 0 })
  totalRewardsRedeemed: number;
}

export const LoyaltyProgramSchema = SchemaFactory.createForClass(LoyaltyProgram);

// Indexes for better query performance
LoyaltyProgramSchema.index({ brand: 1, isActive: 1 });
LoyaltyProgramSchema.index({ 'tiers.tier': 1 });
