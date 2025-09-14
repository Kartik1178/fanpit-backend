import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Space, SpaceSchema } from '../spaces/schemas/space.schema';
import { Booking, BookingSchema } from '../bookings/schemas/booking.schema';
import { Brand, BrandSchema } from '../brands/schemas/brand.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Space.name, schema: SpaceSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: Brand.name, schema: BrandSchema },
    ]),
    UsersModule,
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
