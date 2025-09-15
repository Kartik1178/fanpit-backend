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
exports.BrandSchema = exports.Brand = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Brand = class Brand {
};
exports.Brand = Brand;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Brand.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Brand.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Brand.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            email: { type: String, required: true },
            phone: { type: String, required: true },
            website: { type: String, required: false },
            address: {
                type: {
                    street: { type: String, required: true },
                    city: { type: String, required: true },
                    state: { type: String, required: true },
                    country: { type: String, required: true },
                    postalCode: { type: String, required: false }
                },
                required: true
            }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Brand.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Brand.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Brand.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Brand.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Brand.prototype, "verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Brand.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Brand.prototype, "totalSpaces", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            facebook: { type: String, required: false },
            instagram: { type: String, required: false },
            twitter: { type: String, required: false },
            linkedin: { type: String, required: false }
        },
        default: {}
    }),
    __metadata("design:type", Object)
], Brand.prototype, "socialMedia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'active' }),
    __metadata("design:type", String)
], Brand.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Brand.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            monday: { type: String, required: false },
            tuesday: { type: String, required: false },
            wednesday: { type: String, required: false },
            thursday: { type: String, required: false },
            friday: { type: String, required: false },
            saturday: { type: String, required: false },
            sunday: { type: String, required: false }
        },
        required: false
    }),
    __metadata("design:type", Object)
], Brand.prototype, "businessHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Brand.prototype, "totalBookings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Brand.prototype, "totalRevenue", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                user: { type: mongoose_2.Types.ObjectId, ref: 'User', required: true },
                permissions: [{
                        type: String,
                        enum: ['manage_bookings', 'check_in_out', 'update_attendance', 'grant_bonus_points', 'view_analytics', 'manage_spaces'],
                        default: []
                    }],
                assignedAt: { type: Date, default: Date.now },
                assignedBy: { type: mongoose_2.Types.ObjectId, ref: 'User', required: true },
                isActive: { type: Boolean, default: true }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Brand.prototype, "staffMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            allowStaffBonusPoints: { type: Boolean, default: false },
            maxBonusPointsPerDay: { type: Number, default: 100 },
            requireApprovalForBonus: { type: Boolean, default: true },
            allowStaffAnalytics: { type: Boolean, default: true }
        },
        default: {}
    }),
    __metadata("design:type", Object)
], Brand.prototype, "staffSettings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Brand.prototype, "verifiedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Brand.prototype, "verifiedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Brand.prototype, "verificationNotes", void 0);
exports.Brand = Brand = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Brand);
exports.BrandSchema = mongoose_1.SchemaFactory.createForClass(Brand);
//# sourceMappingURL=brand.schema.js.map