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
exports.LoyaltyMemberSchema = exports.LoyaltyMember = exports.PointsSource = exports.PointsTransactionType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const loyalty_program_schema_1 = require("./loyalty-program.schema");
var PointsTransactionType;
(function (PointsTransactionType) {
    PointsTransactionType["EARNED"] = "earned";
    PointsTransactionType["REDEEMED"] = "redeemed";
    PointsTransactionType["EXPIRED"] = "expired";
    PointsTransactionType["ADJUSTED"] = "adjusted";
    PointsTransactionType["BONUS"] = "bonus";
})(PointsTransactionType || (exports.PointsTransactionType = PointsTransactionType = {}));
var PointsSource;
(function (PointsSource) {
    PointsSource["BOOKING"] = "booking";
    PointsSource["REVIEW"] = "review";
    PointsSource["REFERRAL"] = "referral";
    PointsSource["BONUS"] = "bonus";
    PointsSource["MANUAL"] = "manual";
    PointsSource["REDEMPTION"] = "redemption";
})(PointsSource || (exports.PointsSource = PointsSource = {}));
let LoyaltyMember = class LoyaltyMember {
};
exports.LoyaltyMember = LoyaltyMember;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyMember.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyMember.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'LoyaltyProgram', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], LoyaltyMember.prototype, "loyaltyProgram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalPoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "availablePoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "lifetimePoints", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(loyalty_program_schema_1.LoyaltyTier),
        default: loyalty_program_schema_1.LoyaltyTier.BRONZE
    }),
    __metadata("design:type", String)
], LoyaltyMember.prototype, "currentTier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], LoyaltyMember.prototype, "joinedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LoyaltyMember.prototype, "lastActivityAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalBookings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalSpent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalReviews", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalReferrals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalRewardsRedeemed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], LoyaltyMember.prototype, "totalSavings", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                type: { type: String, enum: Object.values(PointsTransactionType), required: true },
                source: { type: String, enum: Object.values(PointsSource), required: true },
                points: { type: Number, required: true },
                description: { type: String, required: true },
                bookingId: { type: mongoose_2.Types.ObjectId, ref: 'Booking', required: false },
                rewardId: { type: mongoose_2.Types.ObjectId, ref: 'LoyaltyReward', required: false },
                expiresAt: { type: Date, required: false },
                metadata: { type: Object, default: {} }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], LoyaltyMember.prototype, "pointsHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                rewardType: { type: String, enum: Object.values(loyalty_program_schema_1.RewardType), required: true },
                value: { type: Number, required: true },
                description: { type: String, required: true },
                redeemedAt: { type: Date, required: true },
                bookingId: { type: mongoose_2.Types.ObjectId, ref: 'Booking', required: false },
                pointsUsed: { type: Number, required: true },
                isUsed: { type: Boolean, default: false },
                usedAt: { type: Date, required: false },
                expiresAt: { type: Date, required: false }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], LoyaltyMember.prototype, "rewardsHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], LoyaltyMember.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], LoyaltyMember.prototype, "deactivatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LoyaltyMember.prototype, "deactivationReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                tier: { type: String, enum: Object.values(loyalty_program_schema_1.LoyaltyTier), required: true },
                achievedAt: { type: Date, required: true },
                pointsAtAchievement: { type: Number, required: true }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], LoyaltyMember.prototype, "tierHistory", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            currentMonth: {
                pointsEarned: { type: Number, default: 0 },
                pointsRedeemed: { type: Number, default: 0 },
                bookings: { type: Number, default: 0 },
                hours: { type: Number, default: 0 },
                spent: { type: Number, default: 0 }
            },
            lastMonth: {
                pointsEarned: { type: Number, default: 0 },
                pointsRedeemed: { type: Number, default: 0 },
                bookings: { type: Number, default: 0 },
                hours: { type: Number, default: 0 },
                spent: { type: Number, default: 0 }
            }
        },
        default: {
            currentMonth: {
                pointsEarned: 0,
                pointsRedeemed: 0,
                bookings: 0,
                hours: 0,
                spent: 0
            },
            lastMonth: {
                pointsEarned: 0,
                pointsRedeemed: 0,
                bookings: 0,
                hours: 0,
                spent: 0
            }
        }
    }),
    __metadata("design:type", Object)
], LoyaltyMember.prototype, "monthlyStats", void 0);
exports.LoyaltyMember = LoyaltyMember = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LoyaltyMember);
exports.LoyaltyMemberSchema = mongoose_1.SchemaFactory.createForClass(LoyaltyMember);
exports.LoyaltyMemberSchema.index({ user: 1, brand: 1 }, { unique: true });
exports.LoyaltyMemberSchema.index({ user: 1, isActive: 1 });
exports.LoyaltyMemberSchema.index({ brand: 1, currentTier: 1 });
exports.LoyaltyMemberSchema.index({ loyaltyProgram: 1, currentTier: 1 });
exports.LoyaltyMemberSchema.index({ totalPoints: -1 });
exports.LoyaltyMemberSchema.index({ lastActivityAt: -1 });
//# sourceMappingURL=loyalty-member.schema.js.map