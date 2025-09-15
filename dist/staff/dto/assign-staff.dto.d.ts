import { StaffPermission } from '../../users/schemas/user.schema';
export declare class AssignStaffDto {
    userId: string;
    brandId: string;
    permissions?: StaffPermission[];
}
