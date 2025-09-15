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
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';
import { RobustJwtGuard } from '../common/guards/robust-jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  // @UseGuards(RobustJwtGuard) // Temporarily disabled for testing
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    // For testing: use a real user ID from the seeded database
    const userId = req.user?._id || '68c5c4fcff55abf88bb8d231'; // Real test user ID (john.doe@example.com)
    return this.bookingsService.create(createBookingDto, userId);
  }

  @Get()
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async findAll(@Query() queryDto: QueryBookingDto) {
    return this.bookingsService.findAll(queryDto);
  }

  @Get('my-bookings')
  @UseGuards(RobustJwtGuard)
  async findMyBookings(@Query() queryDto: QueryBookingDto, @Request() req) {
    return this.bookingsService.findByUser(req.user.sub, queryDto);
  }

  @Get('availability/:spaceId/:date')
  async getAvailability(@Param('spaceId') spaceId: string, @Param('date') date: string) {
    return this.bookingsService.getAvailability(spaceId, date);
  }

  @Get('stats')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getStats(@Query('spaceId') spaceId?: string) {
    return this.bookingsService.getBookingStats(spaceId);
  }

  @Get(':id')
  @UseGuards(RobustJwtGuard)
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RobustJwtGuard)
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(RobustJwtGuard)
  async remove(@Param('id') id: string) {
    await this.bookingsService.remove(id);
    return { message: 'Booking deleted successfully' };
  }

  @Get('brand/:brandId')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getBrandBookings(@Param('brandId') brandId: string, @Request() req: any) {
    return this.bookingsService.findByBrand(brandId);
  }

  @Get('today')
  @UseGuards(RobustJwtGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getTodayBookings(@Request() req: any) {
    return this.bookingsService.findTodayBookings(req.user.sub);
  }
}


