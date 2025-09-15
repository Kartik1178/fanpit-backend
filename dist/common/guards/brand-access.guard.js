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
exports.BrandAccessGuard = exports.BrandAccess = exports.BRAND_ACCESS_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_schema_1 = require("../../users/schemas/user.schema");
exports.BRAND_ACCESS_KEY = 'brand_access';
const BrandAccess = (permissions) => (0, common_1.SetMetadata)(exports.BRAND_ACCESS_KEY, { permissions });
exports.BrandAccess = BrandAccess;
let BrandAccessGuard = class BrandAccessGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const brandId = request.params.brandId || request.body.brandId;
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        if (user.role === user_schema_1.UserRole.ADMIN) {
            return true;
        }
        if (user.role === user_schema_1.UserRole.BRAND_OWNER) {
            if (user.ownedBrands && user.ownedBrands.includes(brandId)) {
                return true;
            }
        }
        if (user.role === user_schema_1.UserRole.STAFF) {
            const staffAssignment = user.staffAssignments?.find(assignment => assignment.brand.toString() === brandId && assignment.isActive);
            if (!staffAssignment) {
                throw new common_1.ForbiddenException('No access to this brand');
            }
            const requiredPermissions = this.reflector.getAllAndOverride(exports.BRAND_ACCESS_KEY, [context.getHandler(), context.getClass()]);
            if (requiredPermissions && requiredPermissions.length > 0) {
                const hasPermission = requiredPermissions.some(permission => staffAssignment.permissions.includes(permission));
                if (!hasPermission) {
                    throw new common_1.ForbiddenException('Insufficient permissions for this brand');
                }
            }
            return true;
        }
        throw new common_1.ForbiddenException('No access to brand resources');
    }
};
exports.BrandAccessGuard = BrandAccessGuard;
exports.BrandAccessGuard = BrandAccessGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], BrandAccessGuard);
//# sourceMappingURL=brand-access.guard.js.map