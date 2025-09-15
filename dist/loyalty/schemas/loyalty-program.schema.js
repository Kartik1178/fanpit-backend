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
exports.LoyaltyProgramSchema = exports.LoyaltyProgram = exports.RewardType = exports.LoyaltyTier = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var LoyaltyTier;
(function (LoyaltyTier) {
    LoyaltyTier["BRONZE"] = "bronze";
    LoyaltyTier["SILVER"] = "silver";
    LoyaltyTier["GOLD"] = "gold";
    LoyaltyTier["PLATINUM"] = "platinum";
    LoyaltyTier["DIAMOND"] = "diamond";
})(LoyaltyTier || (exports.LoyaltyTier = LoyaltyTier = {}));
var RewardType;
(function (RewardType) {
    RewardType["DISCOUNT"] = "discount";
    RewardType["FREE_HOURS"] = "free_hours";
    RewardType["CASHBACK"] = "cashback";
    RewardType["GIFT"] = "gift";
    RewardType["PRIORITY_BOOKING"] = "priority_booking";
    RewardType["EXCLUSIVE_ACCESS"] = "exclusive_access";
})(RewardType || (exports.RewardType = RewardType = {}));
let LoyaltyProgram = class LoyaltyProgram {
};
exports.LoyaltyProgram = LoyaltyProgram;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyProgram.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoyaltyProgram.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoyaltyProgram.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], LoyaltyProgram.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "pointsPerDollar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "pointsPerHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "pointsPerBooking", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "pointsPerReview", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "pointsPerReferral", void 0);
__decorate([
    (0, mongoose_1.Prop)({
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
                multiplier: { type: Number, default: 1.0 },
                color: { type: String, default: '#8B4513' },
                icon: { type: String, default: 'medal' }
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
    }),
    __metadata("design:type", Array)
], LoyaltyProgram.prototype, "tiers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], LoyaltyProgram.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], LoyaltyProgram.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "totalMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "totalPointsAwarded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyProgram.prototype, "totalRewardsRedeemed", void 0);
exports.LoyaltyProgram = LoyaltyProgram = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LoyaltyProgram);
exports.LoyaltyProgramSchema = mongoose_1.SchemaFactory.createForClass(LoyaltyProgram);
exports.LoyaltyProgramSchema.index({ brand: 1, isActive: 1 });
exports.LoyaltyProgramSchema.index({ 'tiers.tier': 1 });
//# sourceMappingURL=loyalty-program.schema.js.map