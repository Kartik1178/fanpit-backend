import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { BrandsService } from '../brands/brands.service';
import { SpacesService } from '../spaces/spaces.service';
import { StaffService } from '../staff/staff.service';
import { UserRole, StaffPermission } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedComprehensiveData() {
  console.log('🌱 Starting comprehensive data seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const brandsService = app.get(BrandsService);
  const spacesService = app.get(SpacesService);
  const staffService = app.get(StaffService);

  try {
    // Create more users
    const additionalUsers = [
      // More Consumers
      { email: 'alice.consumer@test.com', password: 'password123', firstName: 'Alice', lastName: 'Consumer', phone: '+1234567010', role: UserRole.CONSUMER },
      { email: 'bob.consumer@test.com', password: 'password123', firstName: 'Bob', lastName: 'Consumer', phone: '+1234567011', role: UserRole.CONSUMER },
      { email: 'charlie.consumer@test.com', password: 'password123', firstName: 'Charlie', lastName: 'Consumer', phone: '+1234567012', role: UserRole.CONSUMER },
      { email: 'diana.consumer@test.com', password: 'password123', firstName: 'Diana', lastName: 'Consumer', phone: '+1234567013', role: UserRole.CONSUMER },
      { email: 'eve.consumer@test.com', password: 'password123', firstName: 'Eve', lastName: 'Consumer', phone: '+1234567014', role: UserRole.CONSUMER },
      
      // More Brand Owners
      { email: 'frank.owner@test.com', password: 'password123', firstName: 'Frank', lastName: 'Owner', phone: '+1234567015', role: UserRole.BRAND_OWNER },
      { email: 'grace.owner@test.com', password: 'password123', firstName: 'Grace', lastName: 'Owner', phone: '+1234567016', role: UserRole.BRAND_OWNER },
      
      // More Staff
      { email: 'henry.staff@test.com', password: 'password123', firstName: 'Henry', lastName: 'Staff', phone: '+1234567017', role: UserRole.STAFF },
      { email: 'ivy.staff@test.com', password: 'password123', firstName: 'Ivy', lastName: 'Staff', phone: '+1234567018', role: UserRole.STAFF },
    ];

    console.log('👥 Creating additional users...');
    const createdUsers = [];
    
    for (const userData of additionalUsers) {
      try {
        const result = await usersService.create(userData);
        createdUsers.push(result.user);
        console.log(`✅ Created ${userData.role}: ${result.user.email}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  User already exists: ${userData.email}`);
          const existingUser = await usersService.findByEmail(userData.email);
          if (existingUser) {
            createdUsers.push(existingUser);
          }
        } else {
          console.log(`❌ Error creating user ${userData.email}:`, error.message);
        }
      }
    }

    // Get existing brand owners
    const janeOwner = await usersService.findByEmail('jane.smith@brand.com');
    const alexOwner = await usersService.findByEmail('alex.brown@brand.com');
    const emmaOwner = await usersService.findByEmail('emma.davis@brand.com');
    const frankOwner = createdUsers.find(u => u.email === 'frank.owner@test.com');
    const graceOwner = createdUsers.find(u => u.email === 'grace.owner@test.com');

    // Create comprehensive brands
    console.log('\n🏢 Creating comprehensive brands...');
    const comprehensiveBrands = [
      {
        name: 'TechHub Coworking',
        description: 'Modern coworking space for tech professionals with high-speed internet and meeting rooms',
        owner: janeOwner?._id,
        contact: {
          email: 'info@techhub.com',
          phone: '+1234567020',
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
        totalSpaces: 5,
        totalBookings: 150,
        totalRevenue: 15000,
      },
      {
        name: 'Creative Studio LA',
        description: 'Artistic workspace for creatives with photography studio and art supplies',
        owner: janeOwner?._id,
        contact: {
          email: 'hello@creativestudio.com',
          phone: '+1234567021',
          address: {
            street: '456 Art Avenue',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            postalCode: '90210'
          }
        },
        categories: ['creative', 'art', 'photography'],
        verified: true,
        totalSpaces: 3,
        totalBookings: 89,
        totalRevenue: 8900,
      },
      {
        name: 'Business Center NYC',
        description: 'Professional business center with conference rooms and executive suites',
        owner: alexOwner?._id,
        contact: {
          email: 'contact@businesscenter.com',
          phone: '+1234567022',
          address: {
            street: '789 Business Blvd',
            city: 'New York',
            state: 'NY',
            country: 'USA',
            postalCode: '10001'
          }
        },
        categories: ['business', 'meeting', 'executive'],
        verified: true,
        totalSpaces: 8,
        totalBookings: 200,
        totalRevenue: 25000,
      },
      {
        name: 'Wellness Retreat',
        description: 'Peaceful space for wellness activities, yoga, and meditation',
        owner: emmaOwner?._id,
        contact: {
          email: 'info@wellnessretreat.com',
          phone: '+1234567023',
          address: {
            street: '321 Zen Lane',
            city: 'Portland',
            state: 'OR',
            country: 'USA',
            postalCode: '97201'
          }
        },
        categories: ['wellness', 'yoga', 'meditation'],
        verified: false,
        totalSpaces: 2,
        totalBookings: 45,
        totalRevenue: 4500,
      },
      {
        name: 'Startup Garage',
        description: 'Innovation hub for startups with maker space and prototyping tools',
        owner: frankOwner?._id,
        contact: {
          email: 'hello@startupgarage.com',
          phone: '+1234567024',
          address: {
            street: '555 Innovation Drive',
            city: 'Austin',
            state: 'TX',
            country: 'USA',
            postalCode: '73301'
          }
        },
        categories: ['startup', 'innovation', 'maker'],
        verified: true,
        totalSpaces: 4,
        totalBookings: 78,
        totalRevenue: 7800,
      },
      {
        name: 'Café & Co-working',
        description: 'Cozy café with dedicated co-working spaces and excellent coffee',
        owner: graceOwner?._id,
        contact: {
          email: 'info@cafecowork.com',
          phone: '+1234567025',
          address: {
            street: '888 Coffee Street',
            city: 'Seattle',
            state: 'WA',
            country: 'USA',
            postalCode: '98101'
          }
        },
        categories: ['cafe', 'coworking', 'food'],
        verified: true,
        totalSpaces: 6,
        totalBookings: 120,
        totalRevenue: 12000,
      },
    ];

    const createdBrands = [];
    for (const brandData of comprehensiveBrands) {
      try {
        const brand = await brandsService.create(brandData);
        createdBrands.push(brand);
        console.log(`✅ Created brand: ${brand.name}`);
      } catch (error) {
        console.log(`❌ Error creating brand ${brandData.name}:`, error.message);
      }
    }

    // Create spaces for each brand
    console.log('\n🏠 Creating spaces for brands...');
    const spaceTemplates = [
      { name: 'Open Workspace', capacity: 20, pricePerHour: 15, description: 'Large open workspace with desks and chairs' },
      { name: 'Private Office', capacity: 4, pricePerHour: 25, description: 'Private office with door and whiteboard' },
      { name: 'Meeting Room', capacity: 8, pricePerHour: 20, description: 'Conference room with projector and whiteboard' },
      { name: 'Phone Booth', capacity: 1, pricePerHour: 10, description: 'Soundproof booth for calls and video meetings' },
      { name: 'Creative Studio', capacity: 6, pricePerHour: 30, description: 'Creative space with art supplies and equipment' },
      { name: 'Quiet Zone', capacity: 12, pricePerHour: 18, description: 'Silent workspace for focused work' },
    ];

    for (const brand of createdBrands) {
      const numSpaces = Math.floor(Math.random() * 4) + 2; // 2-5 spaces per brand
      for (let i = 0; i < numSpaces; i++) {
        const template = spaceTemplates[Math.floor(Math.random() * spaceTemplates.length)];
        try {
          await spacesService.create({
            name: `${template.name} ${i + 1}`,
            description: template.description,
            capacity: template.capacity,
            pricePerHour: template.pricePerHour,
            brand: brand._id,
            location: {
              address: brand.contact.address.street,
              city: brand.contact.address.city,
              state: brand.contact.address.state,
              country: brand.contact.address.country,
              postalCode: brand.contact.address.postalCode,
            },
            amenities: ['WiFi', 'Power outlets', 'Air conditioning'],
            images: [],
            isActive: true,
          });
          console.log(`✅ Created space: ${template.name} ${i + 1} for ${brand.name}`);
        } catch (error) {
          console.log(`❌ Error creating space for ${brand.name}:`, error.message);
        }
      }
    }

    // Assign staff to brands
    console.log('\n👨‍💼 Assigning staff to brands...');
    const staffMembers = [
      { email: 'bob.johnson@company.com', name: 'Bob Johnson' },
      { email: 'lisa.garcia@company.com', name: 'Lisa Garcia' },
      { email: 'tom.wilson@company.com', name: 'Tom Wilson' },
      { email: 'henry.staff@test.com', name: 'Henry Staff' },
      { email: 'ivy.staff@test.com', name: 'Ivy Staff' },
    ];

    const staffUsers = [];
    for (const staff of staffMembers) {
      const user = await usersService.findByEmail(staff.email);
      if (user) staffUsers.push(user);
    }

    // Assign staff with different permission levels
    const assignments = [
      { staff: 'bob.johnson@company.com', brand: 'TechHub Coworking', permissions: [StaffPermission.MANAGE_BOOKINGS, StaffPermission.CHECK_IN_OUT, StaffPermission.VIEW_ANALYTICS, StaffPermission.MANAGE_SPACES] },
      { staff: 'lisa.garcia@company.com', brand: 'Creative Studio LA', permissions: [StaffPermission.MANAGE_BOOKINGS, StaffPermission.CHECK_IN_OUT, StaffPermission.VIEW_ANALYTICS] },
      { staff: 'tom.wilson@company.com', brand: 'Business Center NYC', permissions: [StaffPermission.MANAGE_BOOKINGS, StaffPermission.CHECK_IN_OUT, StaffPermission.UPDATE_ATTENDANCE, StaffPermission.VIEW_ANALYTICS] },
      { staff: 'henry.staff@test.com', brand: 'TechHub Coworking', permissions: [StaffPermission.MANAGE_BOOKINGS, StaffPermission.VIEW_ANALYTICS] },
      { staff: 'henry.staff@test.com', brand: 'Startup Garage', permissions: [StaffPermission.CHECK_IN_OUT, StaffPermission.VIEW_ANALYTICS] },
      { staff: 'ivy.staff@test.com', brand: 'Café & Co-working', permissions: [StaffPermission.MANAGE_BOOKINGS, StaffPermission.CHECK_IN_OUT, StaffPermission.GRANT_BONUS_POINTS, StaffPermission.VIEW_ANALYTICS] },
    ];

    for (const assignment of assignments) {
      const staffUser = staffUsers.find(u => u.email === assignment.staff);
      const brand = createdBrands.find(b => b.name === assignment.brand);
      const owner = createdBrands.find(b => b.name === assignment.brand)?.owner;

      if (staffUser && brand && owner) {
        try {
          await staffService.assignStaffToBrand({
            userId: staffUser._id,
            brandId: brand._id,
            permissions: assignment.permissions
          }, owner);
          console.log(`✅ Assigned ${assignment.staff} to ${assignment.brand} with ${assignment.permissions.length} permissions`);
        } catch (error) {
          console.log(`❌ Error assigning staff:`, error.message);
        }
      }
    }

    console.log('\n🎉 Comprehensive data seeding completed!');
    console.log('\n📊 Summary:');
    console.log(`✅ Created ${createdUsers.length} additional users`);
    console.log(`✅ Created ${createdBrands.length} brands`);
    console.log(`✅ Created spaces for all brands`);
    console.log(`✅ Assigned staff to brands with different permission levels`);

    console.log('\n🧪 Enhanced Test Scenarios:');
    console.log('1. Login as jane.smith@brand.com - Should see 2 brands (TechHub, Creative Studio)');
    console.log('2. Login as bob.johnson@company.com - Should see TechHub with full permissions');
    console.log('3. Login as henry.staff@test.com - Should see 2 brands (TechHub, Startup Garage)');
    console.log('4. Login as ivy.staff@test.com - Should see Café & Co-working with bonus points permission');
    console.log('5. Login as admin@company.com - Should see all brands and users for management');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seedComprehensiveData().catch(console.error);
