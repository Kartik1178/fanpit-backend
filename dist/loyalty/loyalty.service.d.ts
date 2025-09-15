import { Model } from 'mongoose';
import { LoyaltyProgram, LoyaltyProgramDocument } from './schemas/loyalty-program.schema';
import { LoyaltyMember, LoyaltyMemberDocument } from './schemas/loyalty-member.schema';
import { LoyaltyReward, LoyaltyRewardDocument } from './schemas/loyalty-reward.schema';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto';
import { CreateLoyaltyRewardDto } from './dto/create-loyalty-reward.dto';
import { EarnPointsDto } from './dto/earn-points.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
export declare class LoyaltyService {
    private loyaltyProgramModel;
    private loyaltyMemberModel;
    private loyaltyRewardModel;
    constructor(loyaltyProgramModel: Model<LoyaltyProgramDocument>, loyaltyMemberModel: Model<LoyaltyMemberDocument>, loyaltyRewardModel: Model<LoyaltyRewardDocument>);
    createLoyaltyProgram(createLoyaltyProgramDto: CreateLoyaltyProgramDto): Promise<LoyaltyProgram>;
    getLoyaltyProgramsByBrand(brandId: string): Promise<LoyaltyProgram[]>;
    getLoyaltyProgramById(id: string): Promise<LoyaltyProgram>;
    updateLoyaltyProgram(id: string, updateData: Partial<CreateLoyaltyProgramDto>): Promise<LoyaltyProgram>;
    joinLoyaltyProgram(userId: string, brandId: string): Promise<LoyaltyMember>;
    getLoyaltyMember(userId: string, brandId: string): Promise<LoyaltyMember>;
    getUserLoyaltyMemberships(userId: string): Promise<LoyaltyMember[]>;
    earnPoints(earnPointsDto: EarnPointsDto): Promise<LoyaltyMember>;
    checkTierUpgrade(member: LoyaltyMember, loyaltyProgram: LoyaltyProgram): Promise<void>;
    createLoyaltyReward(createLoyaltyRewardDto: CreateLoyaltyRewardDto): Promise<LoyaltyReward>;
    getLoyaltyRewardsByBrand(brandId: string): Promise<LoyaltyReward[]>;
    getAvailableRewards(userId: string, brandId: string): Promise<LoyaltyReward[]>;
    redeemReward(redeemRewardDto: RedeemRewardDto): Promise<LoyaltyMember>;
    getLoyaltyAnalytics(brandId: string): Promise<any>;
    getMemberDashboard(userId: string, brandId: string): Promise<any>;
}
