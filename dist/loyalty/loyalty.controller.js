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
exports.LoyaltyController = void 0;
const common_1 = require("@nestjs/common");
const loyalty_service_1 = require("./loyalty.service");
const create_loyalty_program_dto_1 = require("./dto/create-loyalty-program.dto");
const create_loyalty_reward_dto_1 = require("./dto/create-loyalty-reward.dto");
const earn_points_dto_1 = require("./dto/earn-points.dto");
const redeem_reward_dto_1 = require("./dto/redeem-reward.dto");
const robust_jwt_guard_1 = require("../common/guards/robust-jwt.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
let LoyaltyController = class LoyaltyController {
    constructor(loyaltyService) {
        this.loyaltyService = loyaltyService;
    }
    async createLoyaltyProgram(createLoyaltyProgramDto) {
        return this.loyaltyService.createLoyaltyProgram(createLoyaltyProgramDto);
    }
    async getLoyaltyProgramsByBrand(brandId) {
        return this.loyaltyService.getLoyaltyProgramsByBrand(brandId);
    }
    async getLoyaltyProgramById(id) {
        return this.loyaltyService.getLoyaltyProgramById(id);
    }
    async updateLoyaltyProgram(id, updateData) {
        return this.loyaltyService.updateLoyaltyProgram(id, updateData);
    }
    async joinLoyaltyProgram(brandId, req) {
        return this.loyaltyService.joinLoyaltyProgram(req.user.sub, brandId);
    }
    async getUserLoyaltyMemberships(req) {
        console.log('🔧 Loyalty Controller - getUserLoyaltyMemberships called');
        console.log('🔧 Loyalty Controller - User:', req.user);
        return this.loyaltyService.getUserLoyaltyMemberships(req.user.sub);
    }
    async testEndpoint(req) {
        console.log('🔧 Test endpoint called');
        console.log('🔧 Headers:', req.headers);
        return { message: 'Test endpoint working', headers: req.headers };
    }
    async getLoyaltyMember(brandId, req) {
        return this.loyaltyService.getLoyaltyMember(req.user.sub, brandId);
    }
    async getMemberDashboard(brandId, req) {
        return this.loyaltyService.getMemberDashboard(req.user.sub, brandId);
    }
    async earnPoints(earnPointsDto) {
        return this.loyaltyService.earnPoints(earnPointsDto);
    }
    async createLoyaltyReward(createLoyaltyRewardDto) {
        return this.loyaltyService.createLoyaltyReward(createLoyaltyRewardDto);
    }
    async getLoyaltyRewardsByBrand(brandId) {
        return this.loyaltyService.getLoyaltyRewardsByBrand(brandId);
    }
    async getAvailableRewards(brandId, req) {
        return this.loyaltyService.getAvailableRewards(req.user.sub, brandId);
    }
    async redeemReward(redeemRewardDto) {
        return this.loyaltyService.redeemReward(redeemRewardDto);
    }
    async getLoyaltyAnalytics(brandId) {
        return this.loyaltyService.getLoyaltyAnalytics(brandId);
    }
    async getPublicLoyaltyPrograms(brandId) {
        return this.loyaltyService.getLoyaltyProgramsByBrand(brandId);
    }
    async getPublicLoyaltyRewards(brandId) {
        return this.loyaltyService.getLoyaltyRewardsByBrand(brandId);
    }
};
exports.LoyaltyController = LoyaltyController;
__decorate([
    (0, common_1.Post)('programs'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loyalty_program_dto_1.CreateLoyaltyProgramDto]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "createLoyaltyProgram", null);
__decorate([
    (0, common_1.Get)('programs/brand/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getLoyaltyProgramsByBrand", null);
__decorate([
    (0, common_1.Get)('programs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getLoyaltyProgramById", null);
__decorate([
    (0, common_1.Put)('programs/:id'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "updateLoyaltyProgram", null);
__decorate([
    (0, common_1.Post)('join/:brandId'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "joinLoyaltyProgram", null);
__decorate([
    (0, common_1.Get)('memberships'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getUserLoyaltyMemberships", null);
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "testEndpoint", null);
__decorate([
    (0, common_1.Get)('members/:brandId'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getLoyaltyMember", null);
__decorate([
    (0, common_1.Get)('dashboard/:brandId'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getMemberDashboard", null);
__decorate([
    (0, common_1.Post)('earn-points'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN, user_schema_1.UserRole.STAFF),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [earn_points_dto_1.EarnPointsDto]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "earnPoints", null);
__decorate([
    (0, common_1.Post)('rewards'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loyalty_reward_dto_1.CreateLoyaltyRewardDto]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "createLoyaltyReward", null);
__decorate([
    (0, common_1.Get)('rewards/brand/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getLoyaltyRewardsByBrand", null);
__decorate([
    (0, common_1.Get)('rewards/available/:brandId'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getAvailableRewards", null);
__decorate([
    (0, common_1.Post)('redeem-reward'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redeem_reward_dto_1.RedeemRewardDto]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "redeemReward", null);
__decorate([
    (0, common_1.Get)('analytics/:brandId'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getLoyaltyAnalytics", null);
__decorate([
    (0, common_1.Get)('public/programs/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getPublicLoyaltyPrograms", null);
__decorate([
    (0, common_1.Get)('public/rewards/:brandId'),
    __param(0, (0, common_1.Param)('brandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoyaltyController.prototype, "getPublicLoyaltyRewards", null);
exports.LoyaltyController = LoyaltyController = __decorate([
    (0, common_1.Controller)('loyalty'),
    __metadata("design:paramtypes", [loyalty_service_1.LoyaltyService])
], LoyaltyController);
//# sourceMappingURL=loyalty.controller.js.map