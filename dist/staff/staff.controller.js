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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const assign_staff_dto_1 = require("./dto/assign-staff.dto");
const update_staff_permissions_dto_1 = require("./dto/update-staff-permissions.dto");
const robust_jwt_guard_1 = require("../common/guards/robust-jwt.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_schema_1 = require("../users/schemas/user.schema");
let StaffController = class StaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    assignStaffToBrand(assignStaffDto, req) {
        return this.staffService.assignStaffToBrand(assignStaffDto, req.user.sub);
    }
    updateStaffPermissions(assignmentId, updatePermissionsDto, req) {
        return this.staffService.updateStaffPermissions(assignmentId, updatePermissionsDto, req.user.sub);
    }
    removeStaffFromBrand(assignmentId, req) {
        return this.staffService.removeStaffFromBrand(assignmentId, req.user.sub);
    }
    async getStaffForBrand(brandId, req) {
        try {
            const staffData = await this.staffService.getStaffForBrand(brandId);
            return staffData;
        }
        catch (error) {
            console.error('Error fetching staff for brand:', error);
            return [];
        }
    }
    getMyAssignments(req) {
        return this.staffService.getBrandsForStaff(req.user.sub);
    }
    checkStaffPermission(brandId, permission, req) {
        return this.staffService.checkStaffPermission(req.user.sub, brandId, permission);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Post)('assign'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_staff_dto_1.AssignStaffDto, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "assignStaffToBrand", null);
__decorate([
    (0, common_1.Put)(':assignmentId/permissions'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_permissions_dto_1.UpdateStaffPermissionsDto, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "updateStaffPermissions", null);
__decorate([
    (0, common_1.Delete)(':assignmentId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "removeStaffFromBrand", null);
__decorate([
    (0, common_1.Get)('brand/:brandId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.BRAND_OWNER, user_schema_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffForBrand", null);
__decorate([
    (0, common_1.Get)('my-assignments'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.STAFF),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "getMyAssignments", null);
__decorate([
    (0, common_1.Get)('check-permission/:brandId/:permission'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_schema_1.UserRole.STAFF),
    __param(0, (0, common_1.Param)('brandId')),
    __param(1, (0, common_1.Param)('permission')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "checkStaffPermission", null);
exports.StaffController = StaffController = __decorate([
    (0, common_1.Controller)('staff'),
    (0, common_1.UseGuards)(robust_jwt_guard_1.RobustJwtGuard),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map