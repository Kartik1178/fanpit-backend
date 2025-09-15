import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { StaffService } from './staff.service';
import { AssignStaffDto } from './dto/assign-staff.dto';
import { UpdateStaffPermissionsDto } from './dto/update-staff-permissions.dto';
import { RobustJwtGuard } from '../common/guards/robust-jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('staff')
@UseGuards(RobustJwtGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('assign')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  assignStaffToBrand(@Body() assignStaffDto: AssignStaffDto, @Request() req: any) {
    return this.staffService.assignStaffToBrand(assignStaffDto, req.user.sub);
  }

  @Put(':assignmentId/permissions')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  updateStaffPermissions(
    @Param('assignmentId') assignmentId: string,
    @Body() updatePermissionsDto: UpdateStaffPermissionsDto,
    @Request() req: any
  ) {
    return this.staffService.updateStaffPermissions(assignmentId, updatePermissionsDto, req.user.sub);
  }

  @Delete(':assignmentId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  removeStaffFromBrand(@Param('assignmentId') assignmentId: string, @Request() req: any) {
    return this.staffService.removeStaffFromBrand(assignmentId, req.user.sub);
  }

  @Get('brand/:brandId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getStaffForBrand(@Param('brandId') brandId: string, @Request() req: any) {
    try {
      // Get real staff data from database
      const staffData = await this.staffService.getStaffForBrand(brandId);
      return staffData;
    } catch (error) {
      console.error('Error fetching staff for brand:', error);
      return [];
    }
  }

  @Get('my-assignments')
  @UseGuards(RolesGuard)
  @Roles(UserRole.STAFF)
  getMyAssignments(@Request() req: any) {
    return this.staffService.getBrandsForStaff(req.user.sub);
  }

  @Get('check-permission/:brandId/:permission')
  @UseGuards(RolesGuard)
  @Roles(UserRole.STAFF)
  checkStaffPermission(
    @Param('brandId') brandId: string,
    @Param('permission') permission: string,
    @Request() req: any
  ) {
    return this.staffService.checkStaffPermission(req.user.sub, brandId, permission as any);
  }
}