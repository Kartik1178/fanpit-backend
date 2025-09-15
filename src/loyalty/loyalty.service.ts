import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LoyaltyProgram, LoyaltyProgramDocument, LoyaltyTier } from './schemas/loyalty-program.schema';
import { LoyaltyMember, LoyaltyMemberDocument, PointsSource, PointsTransactionType } from './schemas/loyalty-member.schema';
import { LoyaltyReward, LoyaltyRewardDocument, RewardStatus } from './schemas/loyalty-reward.schema';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto';
import { CreateLoyaltyRewardDto } from './dto/create-loyalty-reward.dto';
import { EarnPointsDto } from './dto/earn-points.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectModel(LoyaltyProgram.name) private loyaltyProgramModel: Model<LoyaltyProgramDocument>,
    @InjectModel(LoyaltyMember.name) private loyaltyMemberModel: Model<LoyaltyMemberDocument>,
    @InjectModel(LoyaltyReward.name) private loyaltyRewardModel: Model<LoyaltyRewardDocument>,
  ) {}

  // Loyalty Program Management
  async createLoyaltyProgram(createLoyaltyProgramDto: CreateLoyaltyProgramDto): Promise<LoyaltyProgram> {
    const loyaltyProgram = new this.loyaltyProgramModel(createLoyaltyProgramDto);
    return loyaltyProgram.save();
  }

  async getLoyaltyProgramsByBrand(brandId: string): Promise<LoyaltyProgram[]> {
    return this.loyaltyProgramModel.find({ brand: brandId, isActive: true }).exec();
  }

  async getLoyaltyProgramById(id: string): Promise<LoyaltyProgram> {
    const program = await this.loyaltyProgramModel.findById(id).exec();
    if (!program) {
      throw new NotFoundException('Loyalty program not found');
    }
    return program;
  }

  async updateLoyaltyProgram(id: string, updateData: Partial<CreateLoyaltyProgramDto>): Promise<LoyaltyProgram> {
    const program = await this.loyaltyProgramModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!program) {
      throw new NotFoundException('Loyalty program not found');
    }
    return program;
  }

  // Loyalty Member Management
  async joinLoyaltyProgram(userId: string, brandId: string): Promise<LoyaltyMember> {
    // Check if user is already a member
    const existingMember = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
    if (existingMember) {
      throw new ConflictException('User is already a member of this loyalty program');
    }

    // Get the brand's loyalty program
    const loyaltyProgram = await this.loyaltyProgramModel.findOne({ brand: brandId, isActive: true }).exec();
    if (!loyaltyProgram) {
      throw new NotFoundException('No active loyalty program found for this brand');
    }

    // Create new loyalty member
    const loyaltyMember = new this.loyaltyMemberModel({
      user: userId,
      brand: brandId,
      loyaltyProgram: loyaltyProgram._id,
      currentTier: LoyaltyTier.BRONZE,
      tierHistory: [{
        tier: LoyaltyTier.BRONZE,
        achievedAt: new Date(),
        pointsAtAchievement: 0
      }]
    });

    return loyaltyMember.save();
  }

  async getLoyaltyMember(userId: string, brandId: string): Promise<LoyaltyMember> {
    const member = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
    if (!member) {
      throw new NotFoundException('Loyalty member not found');
    }
    return member;
  }

  async getUserLoyaltyMemberships(userId: string): Promise<LoyaltyMember[]> {
    return this.loyaltyMemberModel.find({ user: userId, isActive: true })
      .populate('brand', 'name logo')
      .populate('loyaltyProgram', 'name description')
      .exec();
  }

  // Points Management
  async earnPoints(earnPointsDto: EarnPointsDto): Promise<LoyaltyMember> {
    const { userId, brandId, source, points, description, bookingId, metadata } = earnPointsDto;

    // Get or create loyalty member
    let member = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
    if (!member) {
      // Auto-join the loyalty program
      const newMember = await this.joinLoyaltyProgram(userId, brandId);
      member = await this.loyaltyMemberModel.findById((newMember as any)._id).exec();
    }

    // Get loyalty program to apply multipliers
    const loyaltyProgram = await this.loyaltyProgramModel.findById(member.loyaltyProgram).exec();
    if (!loyaltyProgram) {
      throw new NotFoundException('Loyalty program not found');
    }

    // Calculate tier multiplier
    const currentTier = loyaltyProgram.tiers.find(tier => tier.tier === member.currentTier);
    const multiplier = currentTier?.multiplier || 1.0;
    const finalPoints = Math.floor(points * multiplier);

    // Update member points
    member.totalPoints += finalPoints;
    member.availablePoints += finalPoints;
    member.lifetimePoints += finalPoints;
    member.lastActivityAt = new Date();

    // Add to points history
    member.pointsHistory.push({
      type: PointsTransactionType.EARNED,
      source,
      points: finalPoints,
      description,
      bookingId: bookingId ? new Types.ObjectId(bookingId) : undefined,
      metadata: metadata || {}
    });

    // Update monthly stats
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const memberCurrentMonth = member.monthlyStats.currentMonth;
    
    if (source === PointsSource.BOOKING) {
      member.totalBookings += 1;
      member.monthlyStats.currentMonth.bookings += 1;
    }

    // Check for tier upgrade
    await this.checkTierUpgrade(member, loyaltyProgram);

    return member.save();
  }

  async checkTierUpgrade(member: LoyaltyMember, loyaltyProgram: LoyaltyProgram): Promise<void> {
    const currentTierIndex = loyaltyProgram.tiers.findIndex(tier => tier.tier === member.currentTier);
    const nextTier = loyaltyProgram.tiers[currentTierIndex + 1];

    if (nextTier && member.totalPoints >= nextTier.minPoints) {
      member.currentTier = nextTier.tier;
      member.tierHistory.push({
        tier: nextTier.tier,
        achievedAt: new Date(),
        pointsAtAchievement: member.totalPoints
      });
    }
  }

  // Rewards Management
  async createLoyaltyReward(createLoyaltyRewardDto: CreateLoyaltyRewardDto): Promise<LoyaltyReward> {
    const reward = new this.loyaltyRewardModel(createLoyaltyRewardDto);
    return reward.save();
  }

  async getLoyaltyRewardsByBrand(brandId: string): Promise<LoyaltyReward[]> {
    return this.loyaltyRewardModel.find({ brand: brandId, isActive: true, status: RewardStatus.ACTIVE })
      .sort({ priority: -1, pointsRequired: 1 })
      .exec();
  }

  async getAvailableRewards(userId: string, brandId: string): Promise<LoyaltyReward[]> {
    const member = await this.getLoyaltyMember(userId, brandId);
    const rewards = await this.loyaltyRewardModel.find({
      brand: brandId,
      isActive: true,
      status: RewardStatus.ACTIVE,
      pointsRequired: { $lte: member.availablePoints },
      $and: [
        {
          $or: [
            { validFrom: { $exists: false } },
            { validFrom: { $lte: new Date() } }
          ]
        },
        {
          $or: [
            { validUntil: { $exists: false } },
            { validUntil: { $gte: new Date() } }
          ]
        }
      ]
    }).sort({ priority: -1, pointsRequired: 1 }).exec();

    // Filter rewards based on user's tier and other criteria
    return rewards.filter(reward => {
      if (reward.isExclusive && !reward.exclusiveTiers.includes(member.currentTier)) {
        return false;
      }
      return true;
    });
  }

  async redeemReward(redeemRewardDto: RedeemRewardDto): Promise<LoyaltyMember> {
    const { userId, rewardId, bookingId, quantity = 1, metadata } = redeemRewardDto;

    // Get reward
    const reward = await this.loyaltyRewardModel.findById(rewardId).exec();
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    if (reward.status !== RewardStatus.ACTIVE) {
      throw new BadRequestException('Reward is not active');
    }

    // Get loyalty member
    const member = await this.getLoyaltyMember(userId, reward.brand.toString());

    // Check if user has enough points
    const totalPointsRequired = reward.pointsRequired * quantity;
    if (member.availablePoints < totalPointsRequired) {
      throw new BadRequestException('Insufficient points');
    }

    // Check redemption limits
    if (reward.maxRedemptions > 0 && reward.totalRedemptions >= reward.maxRedemptions) {
      throw new BadRequestException('Reward redemption limit reached');
    }

    // Check user redemption limit
    const userRedemptions = member.rewardsHistory.filter(r => r.rewardType === reward.type).length;
    if (userRedemptions >= reward.maxRedemptionsPerUser) {
      throw new BadRequestException('User redemption limit reached');
    }

    // Deduct points
    member.availablePoints -= totalPointsRequired;
    member.totalRewardsRedeemed += 1;

    // Add to rewards history
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + reward.expirationDays);

    member.rewardsHistory.push({
      rewardType: reward.type,
      value: reward.value,
      description: reward.description,
      redeemedAt: new Date(),
      bookingId: bookingId ? new Types.ObjectId(bookingId) : undefined,
      pointsUsed: totalPointsRequired,
      isUsed: false,
      expiresAt: expirationDate
    });

    // Add to points history
    member.pointsHistory.push({
      type: PointsTransactionType.REDEEMED,
      source: PointsSource.REDEMPTION,
      points: -totalPointsRequired,
      description: `Redeemed ${reward.name}`,
      rewardId: new Types.ObjectId(reward._id.toString()),
      bookingId: bookingId ? new Types.ObjectId(bookingId) : undefined,
      metadata: metadata || {}
    });

    // Update reward stats
    reward.totalRedemptions += 1;
    reward.totalPointsRedeemed += totalPointsRequired;
    await reward.save();

    return await (member as any).save();
  }

  // Analytics and Reporting
  async getLoyaltyAnalytics(brandId: string): Promise<any> {
    const members = await this.loyaltyMemberModel.find({ brand: brandId }).exec();
    const rewards = await this.loyaltyRewardModel.find({ brand: brandId }).exec();

    const tierDistribution = {};
    let totalPoints = 0;
    let totalRedemptions = 0;
    let totalSavings = 0;

    members.forEach(member => {
      tierDistribution[member.currentTier] = (tierDistribution[member.currentTier] || 0) + 1;
      totalPoints += member.totalPoints;
      totalRedemptions += member.totalRewardsRedeemed;
      totalSavings += member.totalSavings;
    });

    return {
      totalMembers: members.length,
      tierDistribution,
      totalPoints,
      totalRedemptions,
      totalSavings,
      averagePointsPerMember: members.length > 0 ? totalPoints / members.length : 0,
      topRewards: rewards.sort((a, b) => b.totalRedemptions - a.totalRedemptions).slice(0, 5)
    };
  }

  async getMemberDashboard(userId: string, brandId: string): Promise<any> {
    const member = await this.getLoyaltyMember(userId, brandId);
    const loyaltyProgram = await this.loyaltyProgramModel.findById(member.loyaltyProgram).exec();
    const availableRewards = await this.getAvailableRewards(userId, brandId);

    // Get next tier info
    const currentTierIndex = loyaltyProgram.tiers.findIndex(tier => tier.tier === member.currentTier);
    const nextTier = loyaltyProgram.tiers[currentTierIndex + 1];
    const pointsToNextTier = nextTier ? nextTier.minPoints - member.totalPoints : 0;

    return {
      member,
      loyaltyProgram,
      availableRewards,
      nextTier,
      pointsToNextTier,
      tierProgress: nextTier ? (member.totalPoints / nextTier.minPoints) * 100 : 100
    };
  }
}
