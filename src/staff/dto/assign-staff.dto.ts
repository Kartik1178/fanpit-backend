import { IsString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { StaffPermission } from '../../users/schemas/user.schema';

export class AssignStaffDto {
  @IsString()
  userId: string;

  @IsString()
  brandId: string;

  @IsOptional()
  @IsArray()
  @IsEnum(StaffPermission, { each: true })
  permissions?: StaffPermission[];
}
