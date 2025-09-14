import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedUsers() {
  console.log('🌱 Starting user seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const usersToSeed = [
    // Consumer Users
    {
      email: 'john.doe@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: UserRole.CONSUMER,
    },
    {
      email: 'sarah.wilson@example.com',
      password: 'password123',
      firstName: 'Sarah',
      lastName: 'Wilson',
      phone: '+1234567891',
      role: UserRole.CONSUMER,
    },
    {
      email: 'mike.johnson@example.com',
      password: 'password123',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+1234567892',
      role: UserRole.CONSUMER,
    },

    // Brand Owners
    {
      email: 'jane.smith@brand.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567893',
      role: UserRole.BRAND_OWNER,
    },
    {
      email: 'alex.brown@brand.com',
      password: 'password123',
      firstName: 'Alex',
      lastName: 'Brown',
      phone: '+1234567894',
      role: UserRole.BRAND_OWNER,
    },
    {
      email: 'emma.davis@brand.com',
      password: 'password123',
      firstName: 'Emma',
      lastName: 'Davis',
      phone: '+1234567895',
      role: UserRole.BRAND_OWNER,
    },

    // Staff Members
    {
      email: 'bob.johnson@company.com',
      password: 'password123',
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: '+1234567896',
      role: UserRole.STAFF,
    },
    {
      email: 'lisa.garcia@company.com',
      password: 'password123',
      firstName: 'Lisa',
      lastName: 'Garcia',
      phone: '+1234567897',
      role: UserRole.STAFF,
    },
    {
      email: 'tom.wilson@company.com',
      password: 'password123',
      firstName: 'Tom',
      lastName: 'Wilson',
      phone: '+1234567898',
      role: UserRole.STAFF,
    },

    // Admin Users
    {
      email: 'admin@company.com',
      password: 'password123',
      firstName: 'Alice',
      lastName: 'Admin',
      phone: '+1234567899',
      role: UserRole.ADMIN,
    },
    {
      email: 'superadmin@company.com',
      password: 'password123',
      firstName: 'Super',
      lastName: 'Admin',
      phone: '+1234567800',
      role: UserRole.ADMIN,
    },
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const userData of usersToSeed) {
    try {
      const result = await usersService.create(userData);
      console.log(`✅ Created ${userData.role}: ${result.user.email}`);
      successCount++;
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  User already exists: ${userData.email}`);
      } else {
        console.log(`❌ Error creating user ${userData.email}:`, error.message);
        errorCount++;
      }
    }
  }

  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Successfully created: ${successCount} users`);
  console.log(`❌ Errors: ${errorCount} users`);
  console.log(`📝 Total processed: ${usersToSeed.length} users`);

  console.log('\n🔐 Test Credentials:');
  console.log('Consumer: john.doe@example.com / password123');
  console.log('Brand Owner: jane.smith@brand.com / password123');
  console.log('Staff: bob.johnson@company.com / password123');
  console.log('Admin: admin@company.com / password123');

  await app.close();
  console.log('\n🎉 Seeding completed!');
}

seedUsers().catch(console.error);
