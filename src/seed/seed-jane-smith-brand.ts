import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { BrandsService } from '../brands/brands.service';
import { SpacesService } from '../spaces/spaces.service';
import { UsersService } from '../users/users.service';
import { StaffService } from '../staff/staff.service';
import { BookingsService } from '../bookings/bookings.service';
import { UserRole } from '../users/schemas/user.schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedJaneSmithBrand() {
  console.log('🌱 Starting Jane Smith brand seeding...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const brandsService = app.get(BrandsService);
  const spacesService = app.get(SpacesService);
  const usersService = app.get(UsersService);
  const staffService = app.get(StaffService);
  const bookingsService = app.get(BookingsService);

  try {
    // Find Jane Smith (brand owner)
    const janeSmith = await usersService.findByEmail('jane.smith@brand.com');
    if (!janeSmith) {
      console.log('❌ Jane Smith not found. Please run user seeding first.');
      return;
    }

    console.log('✅ Found Jane Smith:', janeSmith.email);

    // Create Jane Smith's brand
    const brandData = {
      name: 'TechHub Coworking',
      description: 'Modern coworking space for tech professionals and startups. Features high-speed internet, meeting rooms, and a vibrant community.',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop&crop=center',
      contact: {
        email: 'info@techhubcoworking.com',
        phone: '+1-555-0123',
        website: 'https://techhubcoworking.com',
        address: {
          street: '123 Innovation Drive',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        }
      },
      operatingHours: {
        monday: { open: '08:00', close: '20:00' },
        tuesday: { open: '08:00', close: '20:00' },
        wednesday: { open: '08:00', close: '20:00' },
        thursday: { open: '08:00', close: '20:00' },
        friday: { open: '08:00', close: '20:00' },
        saturday: { open: '09:00', close: '18:00' },
        sunday: { open: '10:00', close: '16:00' }
      },
      amenities: ['High-speed WiFi', 'Meeting Rooms', 'Coffee Bar', 'Printing', '24/7 Access', 'Parking', 'Kitchen'],
      socialMedia: {
        instagram: '@techhubcoworking',
        twitter: '@techhubcoworking',
        linkedin: 'techhub-coworking'
      },
      owner: janeSmith._id,
      verified: true,
      isActive: true,
      totalSpaces: 0,
      totalBookings: 0,
      totalRevenue: 0
    };

    const brand = await brandsService.create({
      ...brandData,
      owner: janeSmith._id.toString()
    });
    console.log('✅ Created brand:', brand.name);

    // Update Jane Smith's ownedBrands
    await usersService.updateProfile(janeSmith._id.toString(), {
      ownedBrands: [(brand as any)._id]
    });

    // Create spaces for the brand
    const spacesData = [
      {
        name: 'Open Workspace - Floor 1',
        description: 'Spacious open workspace with ergonomic chairs and large desks. Perfect for individual work and small team collaboration.',
        capacity: 20,
        pricePerHour: 15,
        amenities: ['WiFi', 'Power outlets', 'Natural light', 'Air conditioning'],
        location: {
          address: '123 Innovation Drive, Floor 1',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        },
        brand: (brand as any)._id,
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop'
        ],
        isActive: true,
        operatingHours: {
          open: '08:00',
          close: '20:00'
        }
      },
      {
        name: 'Meeting Room Alpha',
        description: 'Professional meeting room with 55" 4K display, whiteboard, and conference phone. Ideal for client meetings and team presentations.',
        capacity: 8,
        pricePerHour: 35,
        amenities: ['4K Display', 'Whiteboard', 'Conference phone', 'WiFi', 'Air conditioning'],
        location: {
          address: '123 Innovation Drive, Floor 2, Room Alpha',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        },
        brand: (brand as any)._id,
        images: [
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
        ],
        isActive: true,
        operatingHours: {
          open: '08:00',
          close: '20:00'
        }
      },
      {
        name: 'Meeting Room Beta',
        description: 'Intimate meeting room perfect for 4-6 person discussions. Features a smart TV and comfortable seating.',
        capacity: 6,
        pricePerHour: 25,
        amenities: ['Smart TV', 'WiFi', 'Air conditioning', 'Comfortable seating'],
        location: {
          address: '123 Innovation Drive, Floor 2, Room Beta',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        },
        brand: (brand as any)._id,
        images: [
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop'
        ],
        isActive: true,
        operatingHours: {
          open: '08:00',
          close: '20:00'
        }
      },
      {
        name: 'Private Office Suite',
        description: 'Fully furnished private office with lockable door, perfect for small teams or individuals who need privacy.',
        capacity: 4,
        pricePerHour: 45,
        amenities: ['Lockable door', 'Furnished', 'WiFi', 'Air conditioning', 'Storage'],
        location: {
          address: '123 Innovation Drive, Floor 3, Suite A',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        },
        brand: (brand as any)._id,
        images: [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
        ],
        isActive: true,
        operatingHours: {
          open: '08:00',
          close: '20:00'
        }
      },
      {
        name: 'Event Space - Innovation Hall',
        description: 'Large event space perfect for workshops, presentations, and networking events. Can accommodate up to 50 people.',
        capacity: 50,
        pricePerHour: 80,
        amenities: ['Projector', 'Sound system', 'Stage', 'WiFi', 'Air conditioning', 'Catering kitchen'],
        location: {
          address: '123 Innovation Drive, Floor 1, Innovation Hall',
          city: 'San Francisco',
          state: 'CA',
          country: 'USA',
          postalCode: '94105'
        },
        brand: (brand as any)._id,
        images: [
          'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop'
        ],
        isActive: true,
        operatingHours: {
          open: '08:00',
          close: '22:00'
        }
      }
    ];

    const createdSpaces = [];
    for (const spaceData of spacesData) {
      const space = await spacesService.create(spaceData);
      createdSpaces.push(space);
      console.log('✅ Created space:', space.name);
    }

    // Update brand with space count
    await brandsService.update((brand as any)._id.toString(), {
      totalSpaces: createdSpaces.length
    }, janeSmith._id.toString());

    // Create some staff members and assign them to the brand
    const staffMembers = [
      {
        email: 'bob.johnson@company.com',
        firstName: 'Bob',
        lastName: 'Johnson',
        phone: '+1-555-0124',
        role: UserRole.STAFF,
        password: 'password123',
        staffAssignments: [{
          brand: (brand as any)._id,
          permissions: ['manage_bookings', 'check_in_out', 'view_analytics'],
          assignedAt: new Date(),
          assignedBy: janeSmith._id,
          isActive: true
        }]
      },
      {
        email: 'lisa.garcia@company.com',
        firstName: 'Lisa',
        lastName: 'Garcia',
        phone: '+1-555-0125',
        role: UserRole.STAFF,
        password: 'password123',
        staffAssignments: [{
          brand: (brand as any)._id,
          permissions: ['manage_bookings', 'check_in_out'],
          assignedAt: new Date(),
          assignedBy: janeSmith._id,
          isActive: true
        }]
      }
    ];

    for (const staffData of staffMembers) {
      const existingStaff = await usersService.findByEmail(staffData.email);
      if (!existingStaff) {
        const staff = await usersService.create(staffData);
        console.log('✅ Created staff member:', (staff as any).email);
      } else {
        // Update existing staff with brand assignment
        await usersService.updateProfile(existingStaff._id.toString(), {
          staffAssignments: staffData.staffAssignments
        });
        console.log('✅ Updated staff member:', existingStaff.email);
      }
    }

    // Create some sample bookings
    const johnDoe = await usersService.findByEmail('john.doe@example.com');
    const sarahWilson = await usersService.findByEmail('sarah.wilson@example.com');
    const mikeJohnson = await usersService.findByEmail('mike.johnson@example.com');

    const sampleBookings = [
      {
        space: (createdSpaces[0] as any)._id.toString(),
        date: '2024-01-20',
        timeSlots: ['09:00', '10:00', '11:00'],
        notes: 'Working on a new project'
      },
      {
        space: (createdSpaces[1] as any)._id.toString(),
        date: '2024-01-21',
        timeSlots: ['14:00', '15:00'],
        notes: 'Client meeting'
      },
      {
        space: (createdSpaces[2] as any)._id.toString(),
        date: '2024-01-22',
        timeSlots: ['10:00'],
        notes: 'Team standup'
      }
    ];

    const users = [johnDoe, sarahWilson, mikeJohnson];
    for (let i = 0; i < sampleBookings.length; i++) {
      const bookingData = sampleBookings[i];
      const user = users[i];
      if (user) {
        const booking = await bookingsService.create(bookingData, user._id.toString());
        console.log('✅ Created booking for:', user.email);
      }
    }

    // Update brand statistics
    const totalBookings = sampleBookings.length;
    const totalRevenue = 140; // Estimated revenue for the bookings
    
    await brandsService.update((brand as any)._id.toString(), {
      totalBookings,
      totalRevenue
    }, janeSmith._id.toString());

    console.log('🎉 Jane Smith brand seeding completed!');
    console.log('📊 Created:');
    console.log(`  - 1 Brand: ${brand.name}`);
    console.log(`  - ${createdSpaces.length} Spaces`);
    console.log(`  - ${staffMembers.length} Staff Members`);
    console.log(`  - ${totalBookings} Sample Bookings`);
    console.log(`  - $${totalRevenue} Total Revenue`);

  } catch (error) {
    console.error('❌ Error seeding Jane Smith brand:', error);
  } finally {
    await app.close();
  }
}

seedJaneSmithBrand();
