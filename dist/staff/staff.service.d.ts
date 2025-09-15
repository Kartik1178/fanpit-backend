import { Model } from 'mongoose';
import { UserDocument, StaffPermission } from '../users/schemas/user.schema';
import { BrandDocument } from '../brands/schemas/brand.schema';
import { AssignStaffDto } from './dto/assign-staff.dto';
import { UpdateStaffPermissionsDto } from './dto/update-staff-permissions.dto';
export declare class StaffService {
    private userModel;
    private brandModel;
    constructor(userModel: Model<UserDocument>, brandModel: Model<BrandDocument>);
    assignStaffToBrand(assignStaffDto: AssignStaffDto, assignedBy: string): Promise<any>;
    updateStaffPermissions(assignmentId: string, updateDto: UpdateStaffPermissionsDto, updatedBy: string): Promise<any>;
    removeStaffFromBrand(assignmentId: string, removedBy: string): Promise<any>;
    getStaffForBrand(brandId: string): Promise<any[]>;
    getBrandsForStaff(userId: string): Promise<any[]>;
    checkStaffPermission(userId: string, brandId: string, permission: StaffPermission): Promise<boolean>;
}
