import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SpacesService } from '../spaces/spaces.service';
import { BrandsService } from '../brands/brands.service';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from '../spaces/schemas/space.schema';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seedSpacesCurated() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const spacesService = app.get(SpacesService);
  const brandsService = app.get(BrandsService);
  const usersService = app.get(UsersService);
  const spaceModel = app.get<Model<any>>(getModelToken(Space.name));

  try {
    console.log('🌱 Seeding curated spaces (Chennai, Hyderabad, Bengaluru, Delhi)...');

    const brandsResult = await brandsService.findAll({ limit: 100 });
    const allBrands = (brandsResult as any).brands || [];
    if (!allBrands.length) {
      console.log('❌ No brands found. Please seed brands first.');
      return;
    }

    const jane = await usersService.findByEmail('jane.smith@brand.com');
    const janeBrand = jane ? allBrands.find((b: any) => b?.owner?.toString?.() === (jane as any)?._id?.toString?.()) : null;

    const pick = (i: number) => (allBrands[i] as any)?._id?.toString?.() || (allBrands[0] as any)._id.toString();
    const janeBrandId = (janeBrand as any)?._id?.toString?.() || pick(0);

    const curated = [
      // Chennai
      {
        name: 'CoWrks OMR',
        description: 'Premium coworking with mentorship, events, and enterprise-grade amenities on OMR.',
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'OMR Road, Sholinganallur', city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
        brand: janeBrandId, // ensure one brand is Jane’s
        amenities: ['WiFi', 'Coffee', 'Meeting Rooms', 'Parking', 'AC'],
        capacity: 160,
        pricePerHour: 25,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['coworking'],
        category: 'coworking',
      },
      {
        name: 'Blue Tokai Velachery',
        description: 'Cafe workspace with specialty coffee and reliable WiFi.',
        images: [
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Phoenix Marketcity, Velachery', city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
        brand: pick(1),
        amenities: ['WiFi', 'Coffee', 'Food', 'AC'],
        capacity: 40,
        pricePerHour: 8,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['cafe'],
        category: 'cafe',
      },

      // Bengaluru
      {
        name: 'Indiranagar Tech Hub',
        description: 'Bengaluru tech hub with events and startup ecosystem.',
        images: [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Indiranagar 100ft Road', city: 'Bengaluru', state: 'Karnataka', country: 'India' },
        brand: pick(2),
        amenities: ['WiFi', 'Coffee', 'Meeting Rooms', 'Parking', 'AC'],
        capacity: 180,
        pricePerHour: 28,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['coworking'],
        category: 'coworking',
      },

      // Delhi
      {
        name: 'Hauz Khas Creative Studio',
        description: 'Creative studio with workshops and exhibition space.',
        images: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1529336953121-ad4898f1f2b9?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Aurobindo Marg, Hauz Khas', city: 'New Delhi', state: 'Delhi', country: 'India' },
        brand: pick(3),
        amenities: ['WiFi', 'Art Supplies', 'Natural Light', 'AC'],
        capacity: 50,
        pricePerHour: 20,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['creative'],
        category: 'creative',
      },

      // Hyderabad
      {
        name: 'HITEC City IT Park',
        description: 'Modern IT-focused coworking in HITEC City.',
        images: [
          'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Madhapur, HITEC City', city: 'Hyderabad', state: 'Telangana', country: 'India' },
        brand: pick(4),
        amenities: ['WiFi', 'Coffee', 'Meeting Rooms', 'Parking', 'AC'],
        capacity: 90,
        pricePerHour: 18,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['coworking'],
        category: 'coworking',
      },

      // Extra spaces
      {
        name: 'Koramangala Startup Lab',
        description: 'Bengaluru Koramangala coworking focused on early-stage teams and weekend hackathons.',
        images: [
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Koramangala 5th Block', city: 'Bengaluru', state: 'Karnataka', country: 'India' },
        brand: pick(1),
        amenities: ['WiFi', 'Coffee', 'Event Space', 'AC'],
        capacity: 70,
        pricePerHour: 16,
        operatingHours: { open: '08:00', close: '22:00' },
        isActive: true,
        tags: ['startup', 'events'],
        category: 'coworking',
      },
      {
        name: 'Connaught Place Business Suites',
        description: 'Delhi CP business suites with meeting rooms and concierge.',
        images: [
          'https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?w=1600&h=1000&fit=crop&q=80',
          'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1600&h=1000&fit=crop&q=80'
        ],
        location: { address: 'Connaught Place, Block F', city: 'New Delhi', state: 'Delhi', country: 'India' },
        brand: pick(2),
        amenities: ['WiFi', 'Meeting Rooms', 'Reception', 'Parking', 'AC'],
        capacity: 60,
        pricePerHour: 32,
        operatingHours: { open: '08:00', close: '20:00' },
        isActive: true,
        tags: ['business'],
        category: 'business',
      },
    ];

    console.log('🧹 Clearing existing spaces...');
    await spaceModel.deleteMany({});

    console.log('🏢 Creating curated spaces...');
    for (const s of curated) {
      try {
        await spacesService.create(s as any);
        console.log(`✅ Created: ${s.name}`);
      } catch (e: any) {
        console.error(`❌ Failed to create ${s.name}:`, e?.message || e);
      }
    }

    console.log(`🎉 Done. Inserted ${curated.length} curated spaces.`);
  } catch (e) {
    console.error('❌ Error during curated seeding:', e);
  } finally {
    await app.close();
  }
}

seedSpacesCurated();


