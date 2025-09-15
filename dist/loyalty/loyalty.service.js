"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const loyalty_program_schema_1 = require("./schemas/loyalty-program.schema");
const loyalty_member_schema_1 = require("./schemas/loyalty-member.schema");
const loyalty_reward_schema_1 = require("./schemas/loyalty-reward.schema");
let LoyaltyService = class LoyaltyService {
    constructor(loyaltyProgramModel, loyaltyMemberModel, loyaltyRewardModel) {
        this.loyaltyProgramModel = loyaltyProgramModel;
        this.loyaltyMemberModel = loyaltyMemberModel;
        this.loyaltyRewardModel = loyaltyRewardModel;
    }
    async createLoyaltyProgram(createLoyaltyProgramDto) {
        const loyaltyProgram = new this.loyaltyProgramModel(createLoyaltyProgramDto);
        return loyaltyProgram.save();
    }
    async getLoyaltyProgramsByBrand(brandId) {
        return this.loyaltyProgramModel.find({ brand: brandId, isActive: true }).exec();
    }
    async getLoyaltyProgramById(id) {
        const program = await this.loyaltyProgramModel.findById(id).exec();
        if (!program) {
            throw new common_1.NotFoundException('Loyalty program not found');
        }
        return program;
    }
    async updateLoyaltyProgram(id, updateData) {
        const program = await this.loyaltyProgramModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!program) {
            throw new common_1.NotFoundException('Loyalty program not found');
        }
        return program;
    }
    async joinLoyaltyProgram(userId, brandId) {
        const existingMember = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
        if (existingMember) {
            throw new common_1.ConflictException('User is already a member of this loyalty program');
        }
        const loyaltyProgram = await this.loyaltyProgramModel.findOne({ brand: brandId, isActive: true }).exec();
        if (!loyaltyProgram) {
            throw new common_1.NotFoundException('No active loyalty program found for this brand');
        }
        const loyaltyMember = new this.loyaltyMemberModel({
            user: userId,
            brand: brandId,
            loyaltyProgram: loyaltyProgram._id,
            currentTier: loyalty_program_schema_1.LoyaltyTier.BRONZE,
            tierHistory: [{
                    tier: loyalty_program_schema_1.LoyaltyTier.BRONZE,
                    achievedAt: new Date(),
                    pointsAtAchievement: 0
                }]
        });
        return loyaltyMember.save();
    }
    async getLoyaltyMember(userId, brandId) {
        const member = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
        if (!member) {
            throw new common_1.NotFoundException('Loyalty member not found');
        }
        return member;
    }
    async getUserLoyaltyMemberships(userId) {
        return this.loyaltyMemberModel.find({ user: userId, isActive: true })
            .populate('brand', 'name logo')
            .populate('loyaltyProgram', 'name description')
            .exec();
    }
    async earnPoints(earnPointsDto) {
        const { userId, brandId, source, points, description, bookingId, metadata } = earnPointsDto;
        let member = await this.loyaltyMemberModel.findOne({ user: userId, brand: brandId }).exec();
        if (!member) {
            const newMember = await this.joinLoyaltyProgram(userId, brandId);
            member = await this.loyaltyMemberModel.findById(newMember._id).exec();
        }
        const loyaltyProgram = await this.loyaltyProgramModel.findById(member.loyaltyProgram).exec();
        if (!loyaltyProgram) {
            throw new common_1.NotFoundException('Loyalty program not found');
        }
        const currentTier = loyaltyProgram.tiers.find(tier => tier.tier === member.currentTier);
        const multiplier = currentTier?.multiplier || 1.0;
        const finalPoints = Math.floor(points * multiplier);
        member.totalPoints += finalPoints;
        member.availablePoints += finalPoints;
        member.lifetimePoints += finalPoints;
        member.lastActivityAt = new Date();
        member.pointsHistory.push({
            type: loyalty_member_schema_1.PointsTransactionType.EARNED,
            source,
            points: finalPoints,
            description,
            bookingId: bookingId ? new mongoose_2.Types.ObjectId(bookingId) : undefined,
            metadata: metadata || {}
        });
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const memberCurrentMonth = member.monthlyStats.currentMonth;
        if (source === loyalty_member_schema_1.PointsSource.BOOKING) {
            member.totalBookings += 1;
            member.monthlyStats.currentMonth.bookings += 1;
        }
        await this.checkTierUpgrade(member, loyaltyProgram);
        return member.save();
    }
    async checkTierUpgrade(member, loyaltyProgram) {
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
    async createLoyaltyReward(createLoyaltyRewardDto) {
        const reward = new this.loyaltyRewardModel(createLoyaltyRewardDto);
        return reward.save();
    }
    async getLoyaltyRewardsByBrand(brandId) {
        return this.loyaltyRewardModel.find({ brand: brandId, isActive: true, status: loyalty_reward_schema_1.RewardStatus.ACTIVE })
            .sort({ priority: -1, pointsRequired: 1 })
            .exec();
    }
    async getAvailableRewards(userId, brandId) {
        const member = await this.getLoyaltyMember(userId, brandId);
        const rewards = await this.loyaltyRewardModel.find({
            brand: brandId,
            isActive: true,
            status: loyalty_reward_schema_1.RewardStatus.ACTIVE,
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
        return rewards.filter(reward => {
            if (reward.isExclusive && !reward.exclusiveTiers.includes(member.currentTier)) {
                return false;
            }
            return true;
        });
    }
    async redeemReward(redeemRewardDto) {
        const { userId, rewardId, bookingId, quantity = 1, metadata } = redeemRewardDto;
        const reward = await this.loyaltyRewardModel.findById(rewardId).exec();
        if (!reward) {
            throw new common_1.NotFoundException('Reward not found');
        }
        if (reward.status !== loyalty_reward_schema_1.RewardStatus.ACTIVE) {
            throw new common_1.BadRequestException('Reward is not active');
        }
        const member = await this.getLoyaltyMember(userId, reward.brand.toString());
        const totalPointsRequired = reward.pointsRequired * quantity;
        if (member.availablePoints < totalPointsRequired) {
            throw new common_1.BadRequestException('Insufficient points');
        }
        if (reward.maxRedemptions > 0 && reward.totalRedemptions >= reward.maxRedemptions) {
            throw new common_1.BadRequestException('Reward redemption limit reached');
        }
        const userRedemptions = member.rewardsHistory.filter(r => r.rewardType === reward.type).length;
        if (userRedemptions >= reward.maxRedemptionsPerUser) {
            throw new common_1.BadRequestException('User redemption limit reached');
        }
        member.availablePoints -= totalPointsRequired;
        member.totalRewardsRedeemed += 1;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + reward.expirationDays);
        member.rewardsHistory.push({
            rewardType: reward.type,
            value: reward.value,
            description: reward.description,
            redeemedAt: new Date(),
            bookingId: bookingId ? new mongoose_2.Types.ObjectId(bookingId) : undefined,
            pointsUsed: totalPointsRequired,
            isUsed: false,
            expiresAt: expirationDate
        });
        member.pointsHistory.push({
            type: loyalty_member_schema_1.PointsTransactionType.REDEEMED,
            source: loyalty_member_schema_1.PointsSource.REDEMPTION,
            points: -totalPointsRequired,
            description: `Redeemed ${reward.name}`,
            rewardId: new mongoose_2.Types.ObjectId(reward._id.toString()),
            bookingId: bookingId ? new mongoose_2.Types.ObjectId(bookingId) : undefined,
            metadata: metadata || {}
        });
        reward.totalRedemptions += 1;
        reward.totalPointsRedeemed += totalPointsRequired;
        await reward.save();
        return await member.save();
    }
    async getLoyaltyAnalytics(brandId) {
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
    async getMemberDashboard(userId, brandId) {
        const member = await this.getLoyaltyMember(userId, brandId);
        const loyaltyProgram = await this.loyaltyProgramModel.findById(member.loyaltyProgram).exec();
        const availableRewards = await this.getAvailableRewards(userId, brandId);
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
};
exports.LoyaltyService = LoyaltyService;
exports.LoyaltyService = LoyaltyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(loyalty_program_schema_1.LoyaltyProgram.name)),
    __param(1, (0, mongoose_1.InjectModel)(loyalty_member_schema_1.LoyaltyMember.name)),
    __param(2, (0, mongoose_1.InjectModel)(loyalty_reward_schema_1.LoyaltyReward.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LoyaltyService);
//# sourceMappingURL=loyalty.service.js.map