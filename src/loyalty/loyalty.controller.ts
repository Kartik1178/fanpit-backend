import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyProgramDto } from './dto/create-loyalty-program.dto';
import { CreateLoyaltyRewardDto } from './dto/create-loyalty-reward.dto';
import { EarnPointsDto } from './dto/earn-points.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SimpleJwtGuard } from '../common/guards/simple-jwt.guard';
import { BypassAuthGuard } from '../common/guards/bypass-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.guard';
import { UserRole } from '../users/schemas/user.schema';

@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  // Loyalty Program Management (Brand Owners & Admin)
  @Post('programs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async createLoyaltyProgram(@Body() createLoyaltyProgramDto: CreateLoyaltyProgramDto) {
    return this.loyaltyService.createLoyaltyProgram(createLoyaltyProgramDto);
  }

  @Get('programs/brand/:brandId')
  async getLoyaltyProgramsByBrand(@Param('brandId') brandId: string) {
    return this.loyaltyService.getLoyaltyProgramsByBrand(brandId);
  }

  @Get('programs/:id')
  async getLoyaltyProgramById(@Param('id') id: string) {
    return this.loyaltyService.getLoyaltyProgramById(id);
  }

  @Put('programs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async updateLoyaltyProgram(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateLoyaltyProgramDto>
  ) {
    return this.loyaltyService.updateLoyaltyProgram(id, updateData);
  }

  // Loyalty Member Management
  @Post('join/:brandId')
  @UseGuards(JwtAuthGuard)
  async joinLoyaltyProgram(
    @Param('brandId') brandId: string,
    @Request() req: any
  ) {
    return this.loyaltyService.joinLoyaltyProgram(req.user.sub, brandId);
  }

  @Get('memberships')
  @UseGuards(BypassAuthGuard)
  async getUserLoyaltyMemberships(@Request() req: any) {
    console.log('🔧 Loyalty Controller - getUserLoyaltyMemberships called');
    console.log('🔧 Loyalty Controller - User:', req.user);
    return this.loyaltyService.getUserLoyaltyMemberships(req.user.sub);
  }

  @Get('test')
  async testEndpoint(@Request() req: any) {
    console.log('🔧 Test endpoint called');
    console.log('🔧 Headers:', req.headers);
    return { message: 'Test endpoint working', headers: req.headers };
  }

  @Get('members/:brandId')
  @UseGuards(JwtAuthGuard)
  async getLoyaltyMember(
    @Param('brandId') brandId: string,
    @Request() req: any
  ) {
    return this.loyaltyService.getLoyaltyMember(req.user.sub, brandId);
  }

  @Get('dashboard/:brandId')
  @UseGuards(JwtAuthGuard)
  async getMemberDashboard(
    @Param('brandId') brandId: string,
    @Request() req: any
  ) {
    return this.loyaltyService.getMemberDashboard(req.user.sub, brandId);
  }

  // Points Management
  @Post('earn-points')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN, UserRole.STAFF)
  async earnPoints(@Body() earnPointsDto: EarnPointsDto) {
    return this.loyaltyService.earnPoints(earnPointsDto);
  }

  // Rewards Management
  @Post('rewards')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async createLoyaltyReward(@Body() createLoyaltyRewardDto: CreateLoyaltyRewardDto) {
    return this.loyaltyService.createLoyaltyReward(createLoyaltyRewardDto);
  }

  @Get('rewards/brand/:brandId')
  async getLoyaltyRewardsByBrand(@Param('brandId') brandId: string) {
    return this.loyaltyService.getLoyaltyRewardsByBrand(brandId);
  }

  @Get('rewards/available/:brandId')
  @UseGuards(JwtAuthGuard)
  async getAvailableRewards(
    @Param('brandId') brandId: string,
    @Request() req: any
  ) {
    return this.loyaltyService.getAvailableRewards(req.user.sub, brandId);
  }

  @Post('redeem-reward')
  @UseGuards(JwtAuthGuard)
  async redeemReward(@Body() redeemRewardDto: RedeemRewardDto) {
    return this.loyaltyService.redeemReward(redeemRewardDto);
  }

  // Analytics and Reporting
  @Get('analytics/:brandId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getLoyaltyAnalytics(@Param('brandId') brandId: string) {
    return this.loyaltyService.getLoyaltyAnalytics(brandId);
  }

  // Public endpoints for frontend
  @Get('public/programs/:brandId')
  async getPublicLoyaltyPrograms(@Param('brandId') brandId: string) {
    return this.loyaltyService.getLoyaltyProgramsByBrand(brandId);
  }

  @Get('public/rewards/:brandId')
  async getPublicLoyaltyRewards(@Param('brandId') brandId: string) {
    return this.loyaltyService.getLoyaltyRewardsByBrand(brandId);
  }
}
