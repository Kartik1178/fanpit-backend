import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { QueryBrandsDto } from './dto/query-brands.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.guard';
import { UserRole } from '../users/schemas/user.schema';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  create(@Body() createBrandDto: CreateBrandDto, @Request() req) {
    // Set the owner from the authenticated user
    if (req.user.role === UserRole.BRAND_OWNER) {
      createBrandDto.owner = req.user.sub;
    }
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryBrandsDto) {
    return this.brandsService.findAll(queryDto);
  }

  @Get('verified')
  getVerifiedBrands() {
    return this.brandsService.getVerifiedBrands();
  }

  @Get('categories')
  getCategories() {
    return this.brandsService.getCategories();
  }

  @Get('owner/:ownerId')
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.brandsService.findByOwner(ownerId);
  }

  @Get('my-brands')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  getMyBrands(@Request() req) {
    return this.brandsService.findByOwner(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @Request() req) {
    // Add authorization check here if needed
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}

