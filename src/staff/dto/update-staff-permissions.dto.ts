import { IsArray, IsEnum } from 'class-validator';
import { StaffPermission } from '../../users/schemas/user.schema';

export class UpdateStaffPermissionsDto {
  @IsArray()
  @IsEnum(StaffPermission, { each: true })
  permissions: StaffPermission[];
}
