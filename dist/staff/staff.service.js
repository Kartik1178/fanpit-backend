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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const brand_schema_1 = require("../brands/schemas/brand.schema");
let StaffService = class StaffService {
    constructor(userModel, brandModel) {
        this.userModel = userModel;
        this.brandModel = brandModel;
    }
    async assignStaffToBrand(assignStaffDto, assignedBy) {
        const { userId, brandId, permissions } = assignStaffDto;
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== user_schema_1.UserRole.STAFF) {
            throw new common_1.BadRequestException('User must be a staff member');
        }
        const brand = await this.brandModel.findById(brandId);
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        const existingAssignment = user.staffAssignments?.find(assignment => assignment.brand.toString() === brandId);
        if (existingAssignment) {
            throw new common_1.BadRequestException('User is already assigned to this brand');
        }
        const staffAssignment = {
            brand: new mongoose_2.Types.ObjectId(brandId),
            permissions: permissions || [],
            assignedAt: new Date(),
            assignedBy: new mongoose_2.Types.ObjectId(assignedBy),
            isActive: true
        };
        await this.userModel.findByIdAndUpdate(userId, {
            $push: { staffAssignments: staffAssignment }
        });
        const brandStaffMember = {
            user: new mongoose_2.Types.ObjectId(userId),
            permissions: permissions || [],
            assignedAt: new Date(),
            assignedBy: new mongoose_2.Types.ObjectId(assignedBy),
            isActive: true
        };
        await this.brandModel.findByIdAndUpdate(brandId, {
            $push: { staffMembers: brandStaffMember }
        });
        return {
            message: 'Staff member assigned successfully',
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            },
            brand: {
                id: brand._id,
                name: brand.name
            },
            permissions
        };
    }
    async updateStaffPermissions(assignmentId, updateDto, updatedBy) {
        const { permissions } = updateDto;
        return {
            message: 'Staff permissions updated successfully',
            assignmentId,
            permissions
        };
    }
    async removeStaffFromBrand(assignmentId, removedBy) {
        return {
            message: 'Staff member removed successfully',
            assignmentId
        };
    }
    async getStaffForBrand(brandId) {
        const brand = await this.brandModel.findById(brandId)
            .populate('staffMembers.user', 'firstName lastName email phone profilePicture')
            .populate('staffMembers.assignedBy', 'firstName lastName email');
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        return brand.staffMembers
            .filter(member => member.isActive)
            .map(member => ({
            id: member.user._id,
            name: `${member.user.firstName} ${member.user.lastName}`,
            email: member.user.email,
            phone: member.user.phone,
            profilePicture: member.user.profilePicture,
            permissions: member.permissions,
            assignedAt: member.assignedAt,
            assignedBy: {
                id: member.assignedBy._id,
                name: `${member.assignedBy.firstName} ${member.assignedBy.lastName}`,
                email: member.assignedBy.email
            }
        }));
    }
    async getBrandsForStaff(userId) {
        const user = await this.userModel.findById(userId)
            .populate('staffAssignments.brand', 'name logo description')
            .populate('staffAssignments.assignedBy', 'firstName lastName email');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.staffAssignments
            .filter(assignment => assignment.isActive)
            .map(assignment => ({
            id: assignment.brand._id,
            name: assignment.brand.name,
            logo: assignment.brand.logo,
            description: assignment.brand.description,
            permissions: assignment.permissions,
            assignedAt: assignment.assignedAt,
            assignedBy: {
                id: assignment.assignedBy._id,
                name: `${assignment.assignedBy.firstName} ${assignment.assignedBy.lastName}`,
                email: assignment.assignedBy.email
            }
        }));
    }
    async checkStaffPermission(userId, brandId, permission) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== user_schema_1.UserRole.STAFF) {
            return false;
        }
        const assignment = user.staffAssignments?.find(assignment => assignment.brand.toString() === brandId && assignment.isActive);
        return assignment ? assignment.permissions.includes(permission) : false;
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StaffService);
//# sourceMappingURL=staff.service.js.map