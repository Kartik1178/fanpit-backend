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
exports.LoyaltyBenefitDto = exports.LoyaltyTierDto = exports.CreateLoyaltyProgramDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const loyalty_program_schema_1 = require("../schemas/loyalty-program.schema");
class CreateLoyaltyProgramDto {
    constructor() {
        this.isActive = true;
        this.pointsPerDollar = 0;
        this.pointsPerHour = 0;
        this.pointsPerBooking = 0;
        this.pointsPerReview = 0;
        this.pointsPerReferral = 0;
    }
}
exports.CreateLoyaltyProgramDto = CreateLoyaltyProgramDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyProgramDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyProgramDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyProgramDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLoyaltyProgramDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyProgramDto.prototype, "pointsPerDollar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyProgramDto.prototype, "pointsPerHour", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyProgramDto.prototype, "pointsPerBooking", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyProgramDto.prototype, "pointsPerReview", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateLoyaltyProgramDto.prototype, "pointsPerReferral", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LoyaltyTierDto),
    __metadata("design:type", Array)
], CreateLoyaltyProgramDto.prototype, "tiers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoyaltyProgramDto.prototype, "endDate", void 0);
class LoyaltyTierDto {
    constructor() {
        this.multiplier = 1.0;
    }
}
exports.LoyaltyTierDto = LoyaltyTierDto;
__decorate([
    (0, class_validator_1.IsEnum)(loyalty_program_schema_1.LoyaltyTier),
    __metadata("design:type", String)
], LoyaltyTierDto.prototype, "tier", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoyaltyTierDto.prototype, "minPoints", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoyaltyTierDto.prototype, "maxPoints", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LoyaltyBenefitDto),
    __metadata("design:type", Array)
], LoyaltyTierDto.prototype, "benefits", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], LoyaltyTierDto.prototype, "multiplier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoyaltyTierDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoyaltyTierDto.prototype, "icon", void 0);
class LoyaltyBenefitDto {
    constructor() {
        this.isActive = true;
    }
}
exports.LoyaltyBenefitDto = LoyaltyBenefitDto;
__decorate([
    (0, class_validator_1.IsEnum)(loyalty_program_schema_1.RewardType),
    __metadata("design:type", String)
], LoyaltyBenefitDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], LoyaltyBenefitDto.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoyaltyBenefitDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LoyaltyBenefitDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-loyalty-program.dto.js.map