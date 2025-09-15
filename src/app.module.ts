import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OtpModule } from './otp/otp.module';
import { BrandsModule } from './brands/brands.module';
import { SpacesModule } from './spaces/spaces.module';
import { BookingsModule } from './bookings/bookings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PaymentsModule } from './payments/payments.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import * as dotenv from 'dotenv';

dotenv.config();

// ✅ Debug log to check if .env is being read
console.log('MONGO_URI =>', process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/fanpit'),
    AuthModule,
    UsersModule,
    OtpModule,
    BrandsModule,
    SpacesModule,
    BookingsModule,
    DashboardModule,
    PaymentsModule,
    LoyaltyModule,
    AdminModule,
    StaffModule,
  ],
})
export class AppModule {}
