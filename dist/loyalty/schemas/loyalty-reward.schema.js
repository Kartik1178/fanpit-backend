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
exports.LoyaltyRewardSchema = exports.LoyaltyReward = exports.RewardStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const loyalty_program_schema_1 = require("./loyalty-program.schema");
var RewardStatus;
(function (RewardStatus) {
    RewardStatus["ACTIVE"] = "active";
    RewardStatus["INACTIVE"] = "inactive";
    RewardStatus["EXPIRED"] = "expired";
    RewardStatus["REDEEMED"] = "redeemed";
})(RewardStatus || (exports.RewardStatus = RewardStatus = {}));
let LoyaltyReward = class LoyaltyReward {
};
exports.LoyaltyReward = LoyaltyReward;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyReward.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'LoyaltyProgram', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyReward.prototype, "loyaltyProgram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(loyalty_program_schema_1.RewardType),
        required: true
    }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "pointsRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'percentage' }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "valueType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(RewardStatus),
        default: RewardStatus.ACTIVE
    }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: -1 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "maxRedemptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "totalRedemptions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "maxRedemptionsPerUser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LoyaltyReward.prototype, "validFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LoyaltyReward.prototype, "validUntil", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 30 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "expirationDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], LoyaltyReward.prototype, "applicableSpaces", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], LoyaltyReward.prototype, "applicableCategories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "minBookingAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "maxDiscountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], LoyaltyReward.prototype, "isStackable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], LoyaltyReward.prototype, "isExclusive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], LoyaltyReward.prototype, "exclusiveTiers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LoyaltyReward.prototype, "termsAndConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], LoyaltyReward.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "totalValueRedeemed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyReward.prototype, "totalPointsRedeemed", void 0);
__decorate([
    (0, mongoose_1.Prop)({
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
    }),
    __metadata("design:type", Object)
], LoyaltyReward.prototype, "redemptionStats", void 0);
exports.LoyaltyReward = LoyaltyReward = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LoyaltyReward);
exports.LoyaltyRewardSchema = mongoose_1.SchemaFactory.createForClass(LoyaltyReward);
exports.LoyaltyRewardSchema.index({ brand: 1, status: 1 });
exports.LoyaltyRewardSchema.index({ loyaltyProgram: 1, isActive: 1 });
exports.LoyaltyRewardSchema.index({ type: 1, status: 1 });
exports.LoyaltyRewardSchema.index({ pointsRequired: 1 });
exports.LoyaltyRewardSchema.index({ validFrom: 1, validUntil: 1 });
exports.LoyaltyRewardSchema.index({ priority: -1 });
//# sourceMappingURL=loyalty-reward.schema.js.map