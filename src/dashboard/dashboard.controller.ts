import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { RobustJwtGuard } from '../common/guards/robust-jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('staff')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.STAFF)
  async getStaffDashboard(@Request() req) {
    return this.dashboardService.getStaffDashboard(req.user.sub);
  }

  @Get('brand-owner')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER)
  async getBrandOwnerDashboard(@Request() req) {
    return this.dashboardService.getBrandOwnerDashboard(req.user.sub);
  }

  @Get('admin')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }
}


