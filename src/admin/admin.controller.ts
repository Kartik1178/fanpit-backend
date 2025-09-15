import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { BanUserDto } from './dto/ban-user.dto';
import { VerifyBrandDto } from './dto/verify-brand.dto';
import { RobustJwtGuard } from '../common/guards/robust-jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('role') role?: UserRole
  ) {
    return this.adminService.getAllUsers(page, limit, role);
  }

  @Post('users/:userId/ban')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async banUser(
    @Param('userId') userId: string,
    @Body() banDto: BanUserDto,
    @Request() req: any
  ) {
    return this.adminService.banUser(userId, banDto, req.user.sub);
  }

  @Post('users/:userId/unban')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async unbanUser(
    @Param('userId') userId: string,
    @Request() req: any
  ) {
    return this.adminService.unbanUser(userId, req.user.sub);
  }

  @Get('brands')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllBrands(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: string
  ) {
    return this.adminService.getAllBrands(page, limit, status);
  }

  @Put('brands/:brandId/verify')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async verifyBrand(
    @Param('brandId') brandId: string,
    @Body() verifyDto: VerifyBrandDto,
    @Request() req: any
  ) {
    return this.adminService.verifyBrand(brandId, verifyDto, req.user.sub);
  }

  @Get('analytics')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getGlobalAnalytics() {
    return this.adminService.getGlobalAnalytics();
  }

  @Post('bookings/:bookingId/resolve')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async resolveBookingDispute(
    @Param('bookingId') bookingId: string,
    @Body('resolution') resolution: string,
    @Request() req: any
  ) {
    return this.adminService.resolveBookingDispute(bookingId, resolution, req.user.sub);
  }
}
