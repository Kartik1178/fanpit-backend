import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto';
import { CreateLoyaltyRewardDto } from './dto/create-loyalty-reward.dto';
import { EarnPointsDto } from './dto/earn-points.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
export declare class LoyaltyController {
    private readonly loyaltyService;
    constructor(loyaltyService: LoyaltyService);
    createLoyaltyProgram(createLoyaltyProgramDto: CreateLoyaltyProgramDto): Promise<import("./schemas/loyalty-program.schema").LoyaltyProgram>;
    getLoyaltyProgramsByBrand(brandId: string): Promise<import("./schemas/loyalty-program.schema").LoyaltyProgram[]>;
    getLoyaltyProgramById(id: string): Promise<import("./schemas/loyalty-program.schema").LoyaltyProgram>;
    updateLoyaltyProgram(id: string, updateData: Partial<CreateLoyaltyProgramDto>): Promise<import("./schemas/loyalty-program.schema").LoyaltyProgram>;
    joinLoyaltyProgram(brandId: string, req: any): Promise<import("./schemas/loyalty-member.schema").LoyaltyMember>;
    getUserLoyaltyMemberships(req: any): Promise<import("./schemas/loyalty-member.schema").LoyaltyMember[]>;
    testEndpoint(req: any): Promise<{
        message: string;
        headers: any;
    }>;
    getLoyaltyMember(brandId: string, req: any): Promise<import("./schemas/loyalty-member.schema").LoyaltyMember>;
    getMemberDashboard(brandId: string, req: any): Promise<any>;
    earnPoints(earnPointsDto: EarnPointsDto): Promise<import("./schemas/loyalty-member.schema").LoyaltyMember>;
    createLoyaltyReward(createLoyaltyRewardDto: CreateLoyaltyRewardDto): Promise<import("./schemas/loyalty-reward.schema").LoyaltyReward>;
    getLoyaltyRewardsByBrand(brandId: string): Promise<import("./schemas/loyalty-reward.schema").LoyaltyReward[]>;
    getAvailableRewards(brandId: string, req: any): Promise<import("./schemas/loyalty-reward.schema").LoyaltyReward[]>;
    redeemReward(redeemRewardDto: RedeemRewardDto): Promise<import("./schemas/loyalty-member.schema").LoyaltyMember>;
    getLoyaltyAnalytics(brandId: string): Promise<any>;
    getPublicLoyaltyPrograms(brandId: string): Promise<import("./schemas/loyalty-program.schema").LoyaltyProgram[]>;
    getPublicLoyaltyRewards(brandId: string): Promise<import("./schemas/loyalty-reward.schema").LoyaltyReward[]>;
}
