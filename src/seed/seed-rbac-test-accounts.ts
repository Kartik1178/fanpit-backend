import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { BrandsService } from '../brands/brands.service';
import { StaffService } from '../staff/staff.service';
import { UserRole, StaffPermission } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedRBACTestAccounts() {
  console.log('🌱 Starting RBAC test account seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const brandsService = app.get(BrandsService);
  const staffService = app.get(StaffService);

  try {
    // Create test users with enhanced RBAC features
    const testUsers = [
      // Consumer Users
      {
        email: 'consumer1@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Consumer',
        phone: '+1234567001',
        role: UserRole.CONSUMER,
      },
      {
        email: 'consumer2@test.com',
        password: 'password123',
        firstName: 'Sarah',
        lastName: 'Consumer',
        phone: '+1234567002',
        role: UserRole.CONSUMER,
      },

      // Brand Owners
      {
        email: 'brandowner1@test.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'BrandOwner',
        phone: '+1234567003',
        role: UserRole.BRAND_OWNER,
      },
      {
        email: 'brandowner2@test.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'BrandOwner',
        phone: '+1234567004',
        role: UserRole.BRAND_OWNER,
      },

      // Staff Members
      {
        email: 'staff1@test.com',
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Staff',
        phone: '+1234567005',
        role: UserRole.STAFF,
      },
      {
        email: 'staff2@test.com',
        password: 'password123',
        firstName: 'Lisa',
        lastName: 'Staff',
        phone: '+1234567006',
        role: UserRole.STAFF,
      },
      {
        email: 'multistaff@test.com',
        password: 'password123',
        firstName: 'Multi',
        lastName: 'Staff',
        phone: '+1234567007',
        role: UserRole.STAFF,
      },

      // Admin Users
      {
        email: 'admin1@test.com',
        password: 'password123',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567008',
        role: UserRole.ADMIN,
        adminPermissions: {
          canManageUsers: true,
          canManageBrands: true,
          canViewGlobalAnalytics: true,
          canResolveDisputes: true,
          canManagePlatformSettings: true,
        },
      },
      {
        email: 'limitedadmin@test.com',
        password: 'password123',
        firstName: 'Limited',
        lastName: 'Admin',
        phone: '+1234567009',
        role: UserRole.ADMIN,
        adminPermissions: {
          canManageUsers: true,
          canManageBrands: false,
          canViewGlobalAnalytics: true,
          canResolveDisputes: false,
          canManagePlatformSettings: false,
        },
      },
    ];

    console.log('👥 Creating test users...');
    const createdUsers = [];
    
    for (const userData of testUsers) {
      try {
        const result = await usersService.create(userData);
        createdUsers.push(result.user);
        console.log(`✅ Created ${userData.role}: ${result.user.email}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  User already exists: ${userData.email}`);
          // Try to find existing user
          const existingUser = await usersService.findByEmail(userData.email);
          if (existingUser) {
            createdUsers.push(existingUser);
          }
        } else {
          console.log(`❌ Error creating user ${userData.email}:`, error.message);
        }
      }
    }

    // Create test brands
    console.log('\n🏢 Creating test brands...');
    const brandOwner1 = createdUsers.find(u => u.email === 'brandowner1@test.com');
    const brandOwner2 = createdUsers.find(u => u.email === 'brandowner2@test.com');

    const testBrands = [
      {
        name: 'TechHub Coworking',
        description: 'Modern coworking space for tech professionals',
        owner: brandOwner1?._id,
        contact: {
          email: 'info@techhub.com',
          phone: '+1234567010',
          address: {
            street: '123 Tech Street',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94105'
          }
        },
        categories: ['coworking', 'tech'],
        verified: true,
      },
      {
        name: 'Creative Studio',
        description: 'Artistic workspace for creatives',
        owner: brandOwner1?._id,
        contact: {
          email: 'hello@creativestudio.com',
          phone: '+1234567011',
          address: {
            street: '456 Art Avenue',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            postalCode: '90210'
          }
        },
        categories: ['creative', 'art'],
        verified: false,
      },
      {
        name: 'Business Center',
        description: 'Professional business center',
        owner: brandOwner2?._id,
        contact: {
          email: 'contact@businesscenter.com',
          phone: '+1234567012',
          address: {
            street: '789 Business Blvd',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001'
          }
        },
        categories: ['business', 'meeting'],
        verified: true,
      },
    ];

    const createdBrands = [];
    for (const brandData of testBrands) {
      try {
        const brand = await brandsService.create(brandData);
        createdBrands.push(brand);
        console.log(`✅ Created brand: ${brand.name}`);
      } catch (error) {
        console.log(`❌ Error creating brand ${brandData.name}:`, error.message);
      }
    }

    // Assign staff to brands
    console.log('\n👨‍💼 Assigning staff to brands...');
    const staff1 = createdUsers.find(u => u.email === 'staff1@test.com');
    const staff2 = createdUsers.find(u => u.email === 'staff2@test.com');
    const multiStaff = createdUsers.find(u => u.email === 'multistaff@test.com');
    const admin1 = createdUsers.find(u => u.email === 'admin1@test.com');

    const techHub = createdBrands.find(b => b.name === 'TechHub Coworking');
    const creativeStudio = createdBrands.find(b => b.name === 'Creative Studio');
    const businessCenter = createdBrands.find(b => b.name === 'Business Center');

    // Staff 1 - Full permissions for TechHub
    if (staff1 && techHub) {
      try {
        await staffService.assignStaffToBrand({
          userId: staff1._id,
          brandId: techHub._id,
          permissions: [
            StaffPermission.MANAGE_BOOKINGS,
            StaffPermission.CHECK_IN_OUT,
            StaffPermission.UPDATE_ATTENDANCE,
            StaffPermission.GRANT_BONUS_POINTS,
            StaffPermission.VIEW_ANALYTICS,
            StaffPermission.MANAGE_SPACES,
          ]
        }, brandOwner1._id);
        console.log(`✅ Assigned ${staff1.firstName} to TechHub with full permissions`);
      } catch (error) {
        console.log(`❌ Error assigning staff:`, error.message);
      }
    }

    // Staff 2 - Limited permissions for Creative Studio
    if (staff2 && creativeStudio) {
      try {
        await staffService.assignStaffToBrand({
          userId: staff2._id,
          brandId: creativeStudio._id,
          permissions: [
            StaffPermission.MANAGE_BOOKINGS,
            StaffPermission.CHECK_IN_OUT,
            StaffPermission.VIEW_ANALYTICS,
          ]
        }, brandOwner1._id);
        console.log(`✅ Assigned ${staff2.firstName} to Creative Studio with limited permissions`);
      } catch (error) {
        console.log(`❌ Error assigning staff:`, error.message);
      }
    }

    // Multi Staff - Works for multiple brands
    if (multiStaff && techHub && businessCenter) {
      try {
        // Assign to TechHub
        await staffService.assignStaffToBrand({
          userId: multiStaff._id,
          brandId: techHub._id,
          permissions: [
            StaffPermission.MANAGE_BOOKINGS,
            StaffPermission.CHECK_IN_OUT,
            StaffPermission.VIEW_ANALYTICS,
          ]
        }, brandOwner1._id);

        // Assign to Business Center
        await staffService.assignStaffToBrand({
          userId: multiStaff._id,
          brandId: businessCenter._id,
          permissions: [
            StaffPermission.MANAGE_BOOKINGS,
            StaffPermission.UPDATE_ATTENDANCE,
            StaffPermission.VIEW_ANALYTICS,
          ]
        }, brandOwner2._id);

        console.log(`✅ Assigned ${multiStaff.firstName} to multiple brands`);
      } catch (error) {
        console.log(`❌ Error assigning multi-staff:`, error.message);
      }
    }

    console.log('\n🎉 RBAC test accounts seeding completed!');
    console.log('\n📋 Test Account Summary:');
    console.log('=====================================');
    
    console.log('\n👤 CONSUMER ACCOUNTS:');
    console.log('Email: consumer1@test.com | Password: password123 | Role: Consumer');
    console.log('Email: consumer2@test.com | Password: password123 | Role: Consumer');
    
    console.log('\n🏢 BRAND OWNER ACCOUNTS:');
    console.log('Email: brandowner1@test.com | Password: password123 | Role: Brand Owner');
    console.log('  - Owns: TechHub Coworking (verified), Creative Studio (pending)');
    console.log('Email: brandowner2@test.com | Password: password123 | Role: Brand Owner');
    console.log('  - Owns: Business Center (verified)');
    
    console.log('\n👨‍💼 STAFF ACCOUNTS:');
    console.log('Email: staff1@test.com | Password: password123 | Role: Staff');
    console.log('  - Assigned to: TechHub Coworking (FULL PERMISSIONS)');
    console.log('Email: staff2@test.com | Password: password123 | Role: Staff');
    console.log('  - Assigned to: Creative Studio (LIMITED PERMISSIONS)');
    console.log('Email: multistaff@test.com | Password: password123 | Role: Staff');
    console.log('  - Assigned to: TechHub Coworking + Business Center (MULTI-BRAND)');
    
    console.log('\n🛡️ ADMIN ACCOUNTS:');
    console.log('Email: admin1@test.com | Password: password123 | Role: Admin (FULL PERMISSIONS)');
    console.log('Email: limitedadmin@test.com | Password: password123 | Role: Admin (LIMITED PERMISSIONS)');

    console.log('\n🧪 TESTING SCENARIOS:');
    console.log('1. Login as consumer1@test.com - Should see consumer dashboard');
    console.log('2. Login as brandowner1@test.com - Should see brand management with 2 brands');
    console.log('3. Login as staff1@test.com - Should see TechHub with full permissions');
    console.log('4. Login as staff2@test.com - Should see Creative Studio with limited permissions');
    console.log('5. Login as multistaff@test.com - Should see multiple brand assignments');
    console.log('6. Login as admin1@test.com - Should see global admin dashboard');
    console.log('7. Login as limitedadmin@test.com - Should see limited admin features');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seedRBACTestAccounts().catch(console.error);
