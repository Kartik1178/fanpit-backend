import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { LoyaltyService } from '../loyalty/loyalty.service';
import { BrandsService } from '../brands/brands.service';
import { UsersService } from '../users/users.service';
import { CreateLoyaltyProgramDto } from '../loyalty/dto/create-loyalty-program.dto';
import { CreateLoyaltyRewardDto } from '../loyalty/dto/create-loyalty-reward.dto';
import { RewardType } from '../loyalty/schemas/loyalty-program.schema';
import { RewardStatus } from '../loyalty/schemas/loyalty-reward.schema';

async function seedLoyaltyData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const loyaltyService = app.get(LoyaltyService);
  const brandsService = app.get(BrandsService);
  const usersService = app.get(UsersService);

  try {
    console.log('🌱 Starting loyalty data seeding...');

    // Get all brands
    const brandsResult = await brandsService.findAll({});
    const brands = brandsResult.brands;
    console.log(`Found ${brands.length} brands`);

    if (brands.length === 0) {
      console.log('❌ No brands found. Please seed brands first.');
      return;
    }

    // Create loyalty programs for each brand
    for (const brand of brands) {
      console.log(`Creating loyalty program for brand: ${brand.name}`);

      const loyaltyProgramDto: CreateLoyaltyProgramDto = {
        brand: (brand as any)._id.toString(),
        name: `${brand.name} Loyalty Program`,
        description: `Join ${brand.name}'s loyalty program to earn points and unlock exclusive rewards!`,
        isActive: true,
        pointsPerDollar: 10, // 10 points per dollar spent
        pointsPerHour: 50, // 50 points per hour booked
        pointsPerBooking: 100, // 100 points per booking
        pointsPerReview: 25, // 25 points per review
        pointsPerReferral: 200, // 200 points per referral
      };

      const loyaltyProgram = await loyaltyService.createLoyaltyProgram(loyaltyProgramDto);
      console.log(`✅ Created loyalty program: ${loyaltyProgram.name}`);

      // Create some sample rewards for each program
      const rewards: CreateLoyaltyRewardDto[] = [
        {
          brand: (brand as any)._id.toString(),
          loyaltyProgram: (loyaltyProgram as any)._id.toString(),
          name: '10% Off Next Booking',
          description: 'Get 10% off your next booking with this brand',
          type: RewardType.DISCOUNT,
          pointsRequired: 500,
          value: 10,
          valueType: 'percentage',
          status: RewardStatus.ACTIVE,
          maxRedemptions: -1, // Unlimited
          maxRedemptionsPerUser: 5,
          expirationDays: 30,
          priority: 1,
          isActive: true,
        },
        {
          brand: (brand as any)._id.toString(),
          loyaltyProgram: (loyaltyProgram as any)._id.toString(),
          name: 'Free Hour',
          description: 'Get one free hour of workspace time',
          type: RewardType.FREE_HOURS,
          pointsRequired: 1000,
          value: 1,
          valueType: 'hours',
          status: RewardStatus.ACTIVE,
          maxRedemptions: -1,
          maxRedemptionsPerUser: 3,
          expirationDays: 60,
          priority: 2,
          isActive: true,
        },
        {
          brand: (brand as any)._id.toString(),
          loyaltyProgram: (loyaltyProgram as any)._id.toString(),
          name: 'Priority Booking',
          description: 'Get priority access to book popular time slots',
          type: RewardType.PRIORITY_BOOKING,
          pointsRequired: 2000,
          value: 1,
          valueType: 'benefit',
          status: RewardStatus.ACTIVE,
          maxRedemptions: -1,
          maxRedemptionsPerUser: 2,
          expirationDays: 90,
          priority: 3,
          isActive: true,
        },
        {
          brand: (brand as any)._id.toString(),
          loyaltyProgram: (loyaltyProgram as any)._id.toString(),
          name: '20% Off Premium Spaces',
          description: 'Get 20% off premium workspace bookings',
          type: RewardType.DISCOUNT,
          pointsRequired: 3000,
          value: 20,
          valueType: 'percentage',
          status: RewardStatus.ACTIVE,
          maxRedemptions: -1,
          maxRedemptionsPerUser: 2,
          expirationDays: 45,
          priority: 4,
          isActive: true,
        },
        {
          brand: (brand as any)._id.toString(),
          loyaltyProgram: (loyaltyProgram as any)._id.toString(),
          name: 'Exclusive Access',
          description: 'Get exclusive access to VIP workspaces and events',
          type: RewardType.EXCLUSIVE_ACCESS,
          pointsRequired: 5000,
          value: 1,
          valueType: 'benefit',
          status: RewardStatus.ACTIVE,
          maxRedemptions: -1,
          maxRedemptionsPerUser: 1,
          expirationDays: 120,
          priority: 5,
          isActive: true,
        },
      ];

      for (const rewardDto of rewards) {
        const reward = await loyaltyService.createLoyaltyReward(rewardDto);
        console.log(`  ✅ Created reward: ${reward.name}`);
      }
    }

    console.log('🎉 Loyalty data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding loyalty data:', error);
  } finally {
    await app.close();
  }
}

seedLoyaltyData();
