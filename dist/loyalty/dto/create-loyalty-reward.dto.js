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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLoyaltyRewardDto = void 0;
const class_validator_1 = require("class-validator");
const loyalty_program_schema_1 = require("../schemas/loyalty-program.schema");
const loyalty_reward_schema_1 = require("../schemas/loyalty-reward.schema");
class CreateLoyaltyRewardDto {
    constructor() {
        this.valueType = 'percentage';
        this.status = loyalty_reward_schema_1.RewardStatus.ACTIVE;
        this.maxRedemptions = -1;
        this.maxRedemptionsPerUser = 1;
        this.expirationDays = 30;
        this.applicableSpaces = [];
        this.applicableCategories = [];
        this.minBookingAmount = 0;
        this.maxDiscountAmount = 0;
        this.isStackable = false;
        this.isExclusive = false;
        this.exclusiveTiers = [];
        this.priority = 0;
        this.isActive = true;
    }
}
exports.CreateLoyaltyRewardDto = CreateLoyaltyRewardDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "loyaltyProgram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(loyalty_program_schema_1.RewardType),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "pointsRequired", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "valueType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(loyalty_reward_schema_1.RewardStatus),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-1),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "maxRedemptions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "maxRedemptionsPerUser", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "validFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "validUntil", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(365),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "expirationDays", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateLoyaltyRewardDto.prototype, "applicableSpaces", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateLoyaltyRewardDto.prototype, "applicableCategories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "minBookingAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "maxDiscountAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLoyaltyRewardDto.prototype, "isStackable", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLoyaltyRewardDto.prototype, "isExclusive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateLoyaltyRewardDto.prototype, "exclusiveTiers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyRewardDto.prototype, "termsAndConditions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyRewardDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLoyaltyRewardDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-loyalty-reward.dto.js.map