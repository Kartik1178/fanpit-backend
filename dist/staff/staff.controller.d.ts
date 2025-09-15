import { StaffService } from './staff.service';
import { AssignStaffDto } from './dto/assign-staff.dto';
import { UpdateStaffPermissionsDto } from './dto/update-staff-permissions.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    assignStaffToBrand(assignStaffDto: AssignStaffDto, req: any): Promise<any>;
    updateStaffPermissions(assignmentId: string, updatePermissionsDto: UpdateStaffPermissionsDto, req: any): Promise<any>;
    removeStaffFromBrand(assignmentId: string, req: any): Promise<any>;
    getStaffForBrand(brandId: string, req: any): Promise<any[]>;
    getMyAssignments(req: any): Promise<any[]>;
    checkStaffPermission(brandId: string, permission: string, req: any): Promise<boolean>;
}
