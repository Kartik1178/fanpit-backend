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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // Temporarily disabled for testing
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    // For testing: use a real user ID from the seeded database
    const userId = req.user?._id || '68c5c4fcff55abf88bb8d231'; // Real test user ID (john.doe@example.com)
    return this.bookingsService.create(createBookingDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async findAll(@Query() queryDto: QueryBookingDto) {
    return this.bookingsService.findAll(queryDto);
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  async findMyBookings(@Query() queryDto: QueryBookingDto, @Request() req) {
    return this.bookingsService.findByUser(req.user.sub, queryDto);
  }

  @Get('availability/:spaceId/:date')
  async getAvailability(@Param('spaceId') spaceId: string, @Param('date') date: string) {
    return this.bookingsService.getAvailability(spaceId, date);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async getStats(@Query('spaceId') spaceId?: string) {
    return this.bookingsService.getBookingStats(spaceId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.bookingsService.remove(id);
    return { message: 'Booking deleted successfully' };
  }

  @Get('brand/:brandId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getBrandBookings(@Param('brandId') brandId: string, @Request() req: any) {
    return this.bookingsService.findByBrand(brandId);
  }

  @Get('today')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF, UserRole.BRAND_OWNER, UserRole.ADMIN)
  async getTodayBookings(@Request() req: any) {
    return this.bookingsService.findTodayBookings(req.user.sub);
  }
}


