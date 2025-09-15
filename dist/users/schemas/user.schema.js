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
exports.UserSchema = exports.User = exports.StaffPermission = exports.UserRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["CONSUMER"] = "consumer";
    UserRole["BRAND_OWNER"] = "brandOwner";
    UserRole["STAFF"] = "staff";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var StaffPermission;
(function (StaffPermission) {
    StaffPermission["MANAGE_BOOKINGS"] = "manage_bookings";
    StaffPermission["CHECK_IN_OUT"] = "check_in_out";
    StaffPermission["UPDATE_ATTENDANCE"] = "update_attendance";
    StaffPermission["GRANT_BONUS_POINTS"] = "grant_bonus_points";
    StaffPermission["VIEW_ANALYTICS"] = "view_analytics";
    StaffPermission["MANAGE_SPACES"] = "manage_spaces";
})(StaffPermission || (exports.StaffPermission = StaffPermission = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.CONSUMER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isPhoneVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                brand: { type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true },
                permissions: [{
                        type: String,
                        enum: Object.values(StaffPermission),
                        default: []
                    }],
                assignedAt: { type: Date, default: Date.now },
                assignedBy: { type: mongoose_2.Types.ObjectId, ref: 'User', required: true },
                isActive: { type: Boolean, default: true }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], User.prototype, "staffAssignments", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'Brand',
        default: []
    }),
    __metadata("design:type", Array)
], User.prototype, "ownedBrands", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            canManageUsers: { type: Boolean, default: false },
            canManageBrands: { type: Boolean, default: false },
            canViewGlobalAnalytics: { type: Boolean, default: false },
            canResolveDisputes: { type: Boolean, default: false },
            canManagePlatformSettings: { type: Boolean, default: false }
        },
        default: {}
    }),
    __metadata("design:type", Object)
], User.prototype, "adminPermissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], User.prototype, "bannedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "banReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "bannedBy", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map