import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { LoyaltyService } from '../loyalty/loyalty.service';
import { UsersService } from '../users/users.service';
import { BrandsService } from '../brands/brands.service';

async function seedLoyaltyMemberships() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const loyaltyService = app.get(LoyaltyService);
  const usersService = app.get(UsersService);
  const brandsService = app.get(BrandsService);

  try {
    console.log('🌱 Starting loyalty memberships seeding...');

    // Get some users
    const users = await usersService.findAll();
    const selectedUsers = users.slice(0, 5); // Get first 5 users
    console.log(`Found ${users.length} users`);

    // Get some brands
    const brandsResult = await brandsService.findAll({});
    const brands = brandsResult.brands.slice(0, 3); // Get first 3 brands
    console.log(`Found ${brands.length} brands`);

    if (selectedUsers.length === 0 || brands.length === 0) {
      console.log('❌ No users or brands found. Please seed users and brands first.');
      return;
    }

    // Enroll users in loyalty programs
    for (const user of selectedUsers) {
      for (const brand of brands) {
        try {
          console.log(`Enrolling user ${user.email} in ${brand.name} loyalty program...`);
          
          const membership = await loyaltyService.joinLoyaltyProgram(
            (user as any)._id.toString(),
            (brand as any)._id.toString()
          );
          
          console.log(`✅ User ${user.email} enrolled in ${brand.name} loyalty program`);
          
          // Award some initial points to make it interesting
          await loyaltyService.earnPoints({
            userId: (user as any)._id.toString(),
            brandId: (brand as any)._id.toString(),
            source: 'signup' as any,
            points: 100,
            description: 'Welcome bonus for joining loyalty program',
            metadata: {
              source: 'signup_bonus'
            }
          });
          
          console.log(`  ✅ Awarded 100 welcome points`);
          
        } catch (error) {
          if (error.message && error.message.includes('already enrolled')) {
            console.log(`  ⚠️  User ${user.email} already enrolled in ${brand.name} loyalty program`);
          } else {
            console.error(`  ❌ Error enrolling user ${user.email} in ${brand.name}:`, error.message);
          }
        }
      }
    }

    console.log('🎉 Loyalty memberships seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding loyalty memberships:', error);
  } finally {
    await app.close();
  }
}

seedLoyaltyMemberships();
