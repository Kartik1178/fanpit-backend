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
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { QuerySpacesDto } from './dto/query-spaces.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.guard';
import { UserRole } from '../users/schemas/user.schema';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.STAFF, UserRole.ADMIN)
  create(@Body() createSpaceDto: CreateSpaceDto, @Request() req) {
    // Set the brand from the authenticated user
    if (req.user.role === UserRole.BRAND_OWNER || req.user.role === UserRole.STAFF) {
      createSpaceDto.brand = req.user.brandId || req.user.sub;
    }
    return this.spacesService.create(createSpaceDto);
  }

  @Get()
  findAll(@Query() queryDto: QuerySpacesDto) {
    return this.spacesService.findAll(queryDto);
  }

  @Get('featured')
  findFeatured() {
    return this.spacesService.findFeatured();
  }

  @Get('categories')
  getCategories() {
    return this.spacesService.getCategories();
  }

  @Get('amenities')
  getAmenities() {
    return this.spacesService.getAmenities();
  }

  @Get('brand/:brandId')
  findByBrand(@Param('brandId') brandId: string) {
    return this.spacesService.findByBrand(brandId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.STAFF, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto, @Request() req) {
    // Add authorization check here if needed
    return this.spacesService.update(id, updateSpaceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.STAFF, UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.spacesService.remove(id);
  }
}
