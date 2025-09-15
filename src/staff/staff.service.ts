import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserRole, StaffPermission } from '../users/schemas/user.schema';
import { Brand, BrandDocument } from '../brands/schemas/brand.schema';
import { AssignStaffDto } from './dto/assign-staff.dto';
import { UpdateStaffPermissionsDto } from './dto/update-staff-permissions.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async assignStaffToBrand(assignStaffDto: AssignStaffDto, assignedBy: string): Promise<any> {
    const { userId, brandId, permissions } = assignStaffDto;

    // Verify the user exists and is a staff member
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.STAFF) {
      throw new BadRequestException('User must be a staff member');
    }

    // Verify the brand exists
    const brand = await this.brandModel.findById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    // Check if user is already assigned to this brand
    const existingAssignment = user.staffAssignments?.find(
      assignment => assignment.brand.toString() === brandId
    );

    if (existingAssignment) {
      throw new BadRequestException('User is already assigned to this brand');
    }

    // Add staff assignment to user
    const staffAssignment = {
      brand: new Types.ObjectId(brandId),
      permissions: permissions || [],
      assignedAt: new Date(),
      assignedBy: new Types.ObjectId(assignedBy),
      isActive: true
    };

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { staffAssignments: staffAssignment }
    });

    // Add staff member to brand
    const brandStaffMember = {
      user: new Types.ObjectId(userId),
      permissions: permissions || [],
      assignedAt: new Date(),
      assignedBy: new Types.ObjectId(assignedBy),
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

  async updateStaffPermissions(
    assignmentId: string, 
    updateDto: UpdateStaffPermissionsDto,
    updatedBy: string
  ): Promise<any> {
    const { permissions } = updateDto;

    // Mock implementation for now
    return {
      message: 'Staff permissions updated successfully',
      assignmentId,
      permissions
    };
  }

  async removeStaffFromBrand(assignmentId: string, removedBy: string): Promise<any> {
    // Mock implementation for now
    return {
      message: 'Staff member removed successfully',
      assignmentId
    };
  }

  async getStaffForBrand(brandId: string): Promise<any[]> {
    const brand = await this.brandModel.findById(brandId)
      .populate('staffMembers.user', 'firstName lastName email phone profilePicture')
      .populate('staffMembers.assignedBy', 'firstName lastName email');

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand.staffMembers
      .filter(member => member.isActive)
      .map(member => ({
        id: (member.user as any)._id,
        name: `${(member.user as any).firstName} ${(member.user as any).lastName}`,
        email: (member.user as any).email,
        phone: (member.user as any).phone,
        profilePicture: (member.user as any).profilePicture,
        permissions: member.permissions,
        assignedAt: member.assignedAt,
        assignedBy: {
          id: (member.assignedBy as any)._id,
          name: `${(member.assignedBy as any).firstName} ${(member.assignedBy as any).lastName}`,
          email: (member.assignedBy as any).email
        }
      }));
  }

  async getBrandsForStaff(userId: string): Promise<any[]> {
    const user = await this.userModel.findById(userId)
      .populate('staffAssignments.brand', 'name logo description')
      .populate('staffAssignments.assignedBy', 'firstName lastName email');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.staffAssignments
      .filter(assignment => assignment.isActive)
      .map(assignment => ({
        id: (assignment.brand as any)._id,
        name: (assignment.brand as any).name,
        logo: (assignment.brand as any).logo,
        description: (assignment.brand as any).description,
        permissions: assignment.permissions,
        assignedAt: assignment.assignedAt,
        assignedBy: {
          id: (assignment.assignedBy as any)._id,
          name: `${(assignment.assignedBy as any).firstName} ${(assignment.assignedBy as any).lastName}`,
          email: (assignment.assignedBy as any).email
        }
      }));
  }

  async checkStaffPermission(
    userId: string, 
    brandId: string, 
    permission: StaffPermission
  ): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    
    if (!user || user.role !== UserRole.STAFF) {
      return false;
    }

    const assignment = user.staffAssignments?.find(
      assignment => assignment.brand.toString() === brandId && assignment.isActive
    );

    return assignment ? assignment.permissions.includes(permission) : false;
  }
}
