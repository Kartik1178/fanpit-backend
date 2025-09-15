import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { BrandsService } from '../brands/brands.service';
import { SpacesService } from '../spaces/spaces.service';
import { BookingsService } from '../bookings/bookings.service';
import { UserRole, StaffPermission } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedStaffAdminData() {
  console.log('🌱 Starting staff and admin data seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const brandsService = app.get(BrandsService);
  const spacesService = app.get(SpacesService);
  const bookingsService = app.get(BookingsService);

  try {
    // Create additional staff members
    const staffMembers = [
      {
        email: 'alex.chen@company.com',
        firstName: 'Alex',
        lastName: 'Chen',
        phone: '+1-555-0126',
        role: UserRole.STAFF,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isActive: true
      },
      {
        email: 'maria.rodriguez@company.com',
        firstName: 'Maria',
        lastName: 'Rodriguez',
        phone: '+1-555-0127',
        role: UserRole.STAFF,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isActive: true
      },
      {
        email: 'david.kim@company.com',
        firstName: 'David',
        lastName: 'Kim',
        phone: '+1-555-0128',
        role: UserRole.STAFF,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isActive: true
      }
    ];

    console.log('👥 Creating staff members...');
    for (const staffData of staffMembers) {
      const existingStaff = await usersService.findByEmail(staffData.email);
      if (!existingStaff) {
        const staff = await usersService.create(staffData);
        console.log('✅ Created staff member:', (staff as any).email);
      } else {
        console.log('ℹ️ Staff member already exists:', staffData.email);
      }
    }

    // Create additional brand owners
    const brandOwners = [
      {
        email: 'robert.wilson@brand.com',
        firstName: 'Robert',
        lastName: 'Wilson',
        phone: '+1-555-0129',
        role: UserRole.BRAND_OWNER,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        isActive: true
      },
      {
        email: 'emily.davis@brand.com',
        firstName: 'Emily',
        lastName: 'Davis',
        phone: '+1-555-0130',
        role: UserRole.BRAND_OWNER,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isActive: true
      }
    ];

    console.log('🏢 Creating brand owners...');
    for (const ownerData of brandOwners) {
      const existingOwner = await usersService.findByEmail(ownerData.email);
      if (!existingOwner) {
        const owner = await usersService.create(ownerData);
        console.log('✅ Created brand owner:', (owner as any).email);
      } else {
        console.log('ℹ️ Brand owner already exists:', ownerData.email);
      }
    }

    // Create additional brands for the new owners
    const robertWilson = await usersService.findByEmail('robert.wilson@brand.com');
    const emilyDavis = await usersService.findByEmail('emily.davis@brand.com');

    if (robertWilson) {
      const robertBrand = await brandsService.create({
        name: 'Creative Studios SF',
        description: 'Art and design studios for creative professionals. Features photography studios, art galleries, and maker spaces.',
        logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop&crop=center',
        contact: {
          email: 'info@creativestudiossf.com',
          phone: '+1-555-0131',
          website: 'https://creativestudiossf.com',
          address: {
            street: '456 Art District Blvd',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94110'
          }
        },
        categories: ['Photography Studio', 'Art Gallery', 'Maker Space', 'WiFi', 'Parking', 'Kitchen'],
        socialMedia: {
          instagram: '@creativestudiossf',
          twitter: '@creativestudiossf'
        },
        owner: robertWilson._id.toString(),
        verified: true,
        isActive: true,
        totalSpaces: 0,
        totalBookings: 0,
        totalRevenue: 0
      });

      console.log('✅ Created brand for Robert Wilson:', robertBrand.name);

      // Create spaces for Robert's brand
      const robertSpaces = [
        {
          name: 'Photography Studio A',
          description: 'Professional photography studio with natural light, backdrop system, and professional lighting equipment.',
          capacity: 6,
          pricePerHour: 60,
          amenities: ['Professional Lighting', 'Backdrop System', 'Natural Light', 'WiFi'],
          location: {
            address: '456 Art District Blvd, Studio A',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94110'
          },
          brand: (robertBrand as any)._id,
          images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop'],
          isActive: true,
          operatingHours: { open: '09:00', close: '21:00' }
        },
        {
          name: 'Art Gallery Space',
          description: 'Large gallery space perfect for exhibitions, art shows, and creative events.',
          capacity: 40,
          pricePerHour: 100,
          amenities: ['Gallery Lighting', 'White Walls', 'WiFi', 'Sound System'],
          location: {
            address: '456 Art District Blvd, Gallery',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94110'
          },
          brand: (robertBrand as any)._id,
          images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'],
          isActive: true,
          operatingHours: { open: '09:00', close: '21:00' }
        }
      ];

      for (const spaceData of robertSpaces) {
        const space = await spacesService.create(spaceData);
        console.log('✅ Created space for Robert:', space.name);
      }

      // Update Robert's ownedBrands
      await usersService.updateProfile(robertWilson._id.toString(), {
        ownedBrands: [(robertBrand as any)._id]
      });
    }

    if (emilyDavis) {
      const emilyBrand = await brandsService.create({
        name: 'Wellness Retreat Center',
        description: 'Peaceful wellness center offering yoga studios, meditation rooms, and wellness workshops.',
        logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=center',
        contact: {
          email: 'info@wellnessretreatcenter.com',
          phone: '+1-555-0132',
          website: 'https://wellnessretreatcenter.com',
          address: {
            street: '789 Zen Garden Way',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94115'
          }
        },
        categories: ['Yoga Studio', 'Meditation Room', 'Sauna', 'Parking', 'Garden', 'WiFi'],
        socialMedia: {
          instagram: '@wellnessretreatcenter',
          facebook: 'wellnessretreatcenter'
        },
        owner: emilyDavis._id.toString(),
        verified: true,
        isActive: true,
        totalSpaces: 0,
        totalBookings: 0,
        totalRevenue: 0
      });

      console.log('✅ Created brand for Emily Davis:', emilyBrand.name);

      // Create spaces for Emily's brand
      const emilySpaces = [
        {
          name: 'Yoga Studio - Lotus Room',
          description: 'Spacious yoga studio with hardwood floors, mirrors, and peaceful ambiance. Perfect for all levels of yoga practice.',
          capacity: 20,
          pricePerHour: 40,
          amenities: ['Hardwood Floors', 'Mirrors', 'Yoga Props', 'Sound System', 'Natural Light'],
          location: {
            address: '789 Zen Garden Way, Lotus Room',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94115'
          },
          brand: (emilyBrand as any)._id,
          images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'],
          isActive: true,
          operatingHours: { open: '06:00', close: '22:00' }
        },
        {
          name: 'Meditation Room - Serenity',
          description: 'Quiet meditation room with comfortable seating, soft lighting, and peaceful atmosphere.',
          capacity: 12,
          pricePerHour: 25,
          amenities: ['Comfortable Seating', 'Soft Lighting', 'Soundproof', 'Incense'],
          location: {
            address: '789 Zen Garden Way, Serenity Room',
            city: 'San Francisco',
            state: 'CA',
            country: 'USA',
            postalCode: '94115'
          },
          brand: (emilyBrand as any)._id,
          images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
          isActive: true,
          operatingHours: { open: '06:00', close: '22:00' }
        }
      ];

      for (const spaceData of emilySpaces) {
        const space = await spacesService.create(spaceData);
        console.log('✅ Created space for Emily:', space.name);
      }

      // Update Emily's ownedBrands
      await usersService.updateProfile(emilyDavis._id.toString(), {
        ownedBrands: [(emilyBrand as any)._id]
      });
    }

    // Create additional admin users
    const adminUsers = [
      {
        email: 'admin@fanpit.com',
        firstName: 'System',
        lastName: 'Administrator',
        phone: '+1-555-0001',
        role: UserRole.ADMIN,
        password: 'admin123',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isActive: true,
        adminPermissions: {
          canManageUsers: true,
          canManageBrands: true,
          canViewGlobalAnalytics: true,
          canResolveDisputes: true,
          canManagePlatformSettings: true
        }
      },
      {
        email: 'support@fanpit.com',
        firstName: 'Support',
        lastName: 'Manager',
        phone: '+1-555-0002',
        role: UserRole.ADMIN,
        password: 'support123',
        profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isActive: true,
        adminPermissions: {
          canManageUsers: true,
          canManageBrands: false,
          canViewGlobalAnalytics: true,
          canResolveDisputes: true,
          canManagePlatformSettings: false
        }
      }
    ];

    console.log('👑 Creating admin users...');
    for (const adminData of adminUsers) {
      const existingAdmin = await usersService.findByEmail(adminData.email);
      if (!existingAdmin) {
        const admin = await usersService.create(adminData);
        console.log('✅ Created admin user:', (admin as any).email);
      } else {
        console.log('ℹ️ Admin user already exists:', adminData.email);
      }
    }

    // Create additional consumers for more diverse data
    const consumers = [
      {
        email: 'alice.brown@example.com',
        firstName: 'Alice',
        lastName: 'Brown',
        phone: '+1-555-0133',
        role: UserRole.CONSUMER,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        isActive: true
      },
      {
        email: 'charlie.miller@example.com',
        firstName: 'Charlie',
        lastName: 'Miller',
        phone: '+1-555-0134',
        role: UserRole.CONSUMER,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isActive: true
      },
      {
        email: 'diana.taylor@example.com',
        firstName: 'Diana',
        lastName: 'Taylor',
        phone: '+1-555-0135',
        role: UserRole.CONSUMER,
        password: 'password123',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        isActive: true
      }
    ];

    console.log('👤 Creating additional consumers...');
    for (const consumerData of consumers) {
      const existingConsumer = await usersService.findByEmail(consumerData.email);
      if (!existingConsumer) {
        const consumer = await usersService.create(consumerData);
        console.log('✅ Created consumer:', (consumer as any).email);
      } else {
        console.log('ℹ️ Consumer already exists:', consumerData.email);
      }
    }

    console.log('🎉 Staff and admin data seeding completed!');
    console.log('📊 Created:');
    console.log(`  - ${staffMembers.length} Staff Members`);
    console.log(`  - ${brandOwners.length} Brand Owners`);
    console.log(`  - ${adminUsers.length} Admin Users`);
    console.log(`  - ${consumers.length} Additional Consumers`);
    console.log(`  - 2 Additional Brands with Spaces`);

  } catch (error) {
    console.error('❌ Error seeding staff and admin data:', error);
  } finally {
    await app.close();
  }
}

seedStaffAdminData();
