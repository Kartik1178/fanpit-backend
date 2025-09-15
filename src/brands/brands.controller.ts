import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('brands')
@UseGuards(JwtAuthGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  create(@Body() createBrandDto: CreateBrandDto, @Request() req: any) {
    return this.brandsService.create({
      ...createBrandDto,
      owner: req.user.sub
    });
  }

  @Get()
  findAll() {
    return this.brandsService.findAll({});
  }

  @Get('my-brands')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async findMyBrands(@Request() req: any) {
    try {
      const brands = await this.brandsService.findByOwner(req.user.sub);
      
      // Transform brands to include real dashboard data from database
      const transformedBrands = await Promise.all(brands.map(async (brand: any) => {
        const stats = await this.brandsService.getBrandStats(brand._id, req.user.sub);
        
        return {
          id: brand._id,
          name: brand.name,
          description: brand.description,
          logo: brand.logo,
          verified: stats.verified,
          status: stats.isActive ? 'active' : 'inactive',
          totalSpaces: stats.totalSpaces,
          totalBookings: stats.totalBookings,
          totalRevenue: stats.totalRevenue,
          staffCount: stats.staffCount,
        };
      }));

      return transformedBrands;
    } catch (error) {
      console.error('Error fetching user brands:', error);
      return [];
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Get(':id/spaces')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getBrandSpaces(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.getBrandSpaces(id, req.user.sub);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @Request() req: any) {
    return this.brandsService.update(id, updateBrandDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.remove(id, req.user.sub);
  }

  @Get(':id/analytics')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  getBrandAnalytics(@Param('id') id: string, @Request() req: any) {
    return this.brandsService.getBrandAnalytics(id, req.user.sub);
  }
}