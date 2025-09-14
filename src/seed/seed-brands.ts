import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { BrandsService } from '../brands/brands.service';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seedBrands() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const brandsService = app.get(BrandsService);
  const usersService = app.get(UsersService);

  try {
    console.log('🌱 Starting brands seeding...');

    // Get brand owners to assign brands to
    const allUsers = await usersService.findAll();
    const brandOwners = allUsers.filter(user => user.role === 'brandOwner');
    
    if (brandOwners.length === 0) {
      console.log('❌ No brand owners found. Please seed users first.');
      return;
    }

    const sampleBrands = [
      // CHENNAI BRANDS
      {
        name: "T-Hub",
        description: "India's largest startup incubator and innovation hub, fostering entrepreneurship and innovation across multiple cities with state-of-the-art facilities and mentorship programs.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "info@thub.co.in",
          phone: "+91-40-6651-5000",
          website: "https://thub.co.in",
          address: {
            street: "Catalyst Building, T-Hub, IIIT Campus",
            city: "Hyderabad",
            state: "Telangana",
            country: "India",
            postalCode: "500032"
          }
        },
        owner: (brandOwners[0] as any)._id,
        categories: ["coworking", "incubator", "startup"],
        isActive: true,
        verified: true,
        rating: 4.9,
        totalSpaces: 5,
        socialMedia: {
          facebook: "https://facebook.com/thubindia",
          instagram: "https://instagram.com/thubindia",
          twitter: "https://twitter.com/thubindia",
          linkedin: "https://linkedin.com/company/thub"
        },
        status: "active",
        tags: ["startup", "incubator", "tech", "innovation", "mentorship"],
        businessHours: {
          monday: "8:00-20:00",
          tuesday: "8:00-20:00",
          wednesday: "8:00-20:00",
          thursday: "8:00-20:00",
          friday: "8:00-20:00",
          saturday: "9:00-17:00",
          sunday: "Closed"
        },
        totalBookings: 1250,
        totalRevenue: 250000
      },
      {
        name: "CoWrks",
        description: "Premium coworking space provider with modern amenities, networking events, and a professional environment for businesses of all sizes across India.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@cowrks.com",
          phone: "+91-80-4115-5555",
          website: "https://cowrks.com",
          address: {
            street: "UB City, Vittal Mallya Road",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560001"
          }
        },
        owner: brandOwners[1] ? (brandOwners[1] as any)._id : (brandOwners[0] as any)._id,
        categories: ["coworking", "business", "premium"],
        isActive: true,
        verified: true,
        rating: 4.7,
        totalSpaces: 8,
        socialMedia: {
          facebook: "https://facebook.com/cowrks",
          instagram: "https://instagram.com/cowrks",
          twitter: "https://twitter.com/cowrks",
          linkedin: "https://linkedin.com/company/cowrks"
        },
        status: "active",
        tags: ["premium", "business", "networking", "professional"],
        businessHours: {
          monday: "9:00-19:00",
          tuesday: "9:00-19:00",
          wednesday: "9:00-19:00",
          thursday: "9:00-19:00",
          friday: "9:00-19:00",
          saturday: "10:00-16:00",
          sunday: "Closed"
        },
        totalBookings: 980,
        totalRevenue: 196000
      },
      {
        name: "Innov8",
        description: "Creative coworking space with flexible seating, event spaces, and a community of creative professionals and freelancers across major Indian cities.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@innov8.work",
          phone: "+91-11-4155-5555",
          website: "https://innov8.work",
          address: {
            street: "Connaught Place, New Delhi",
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            postalCode: "110001"
          }
        },
        owner: brandOwners[2] ? (brandOwners[2] as any)._id : (brandOwners[0] as any)._id,
        categories: ["coworking", "creative", "flexible"],
        isActive: true,
        verified: true,
        rating: 4.5,
        totalSpaces: 6,
        socialMedia: {
          facebook: "https://facebook.com/innov8work",
          instagram: "https://instagram.com/innov8work",
          twitter: "https://twitter.com/innov8work",
          linkedin: "https://linkedin.com/company/innov8"
        },
        status: "active",
        tags: ["creative", "flexible", "events", "freelancer", "community"],
        businessHours: {
          monday: "9:00-21:00",
          tuesday: "9:00-21:00",
          wednesday: "9:00-21:00",
          thursday: "9:00-21:00",
          friday: "9:00-21:00",
          saturday: "10:00-18:00",
          sunday: "Closed"
        },
        totalBookings: 750,
        totalRevenue: 150000
      },
      {
        name: "Café Coffee Day",
        description: "India's largest coffee chain with dedicated workspace areas, perfect for casual meetings and remote work with reliable WiFi and great coffee.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "info@cafecoffeeday.com",
          phone: "+91-80-4115-5555",
          website: "https://cafecoffeeday.com",
          address: {
            street: "Vittal Mallya Road, UB City",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560001"
          }
        },
        owner: (brandOwners[0] as any)._id,
        categories: ["cafe", "casual", "coffee"],
        isActive: true,
        verified: true,
        rating: 4.3,
        totalSpaces: 12,
        socialMedia: {
          facebook: "https://facebook.com/cafecoffeeday",
          instagram: "https://instagram.com/cafecoffeeday",
          twitter: "https://twitter.com/cafecoffeeday",
          linkedin: "https://linkedin.com/company/cafe-coffee-day"
        },
        status: "active",
        tags: ["cafe", "casual", "remote work", "coffee", "affordable"],
        businessHours: {
          monday: "7:00-23:00",
          tuesday: "7:00-23:00",
          wednesday: "7:00-23:00",
          thursday: "7:00-23:00",
          friday: "7:00-23:00",
          saturday: "7:00-23:00",
          sunday: "7:00-23:00"
        },
        totalBookings: 2100,
        totalRevenue: 168000
      },
      {
        name: "Starbucks India",
        description: "Premium coffee experience with dedicated workspace areas, premium coffee, and a professional atmosphere for business meetings.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "customer.service@starbucks.co.in",
          phone: "+91-80-4115-5555",
          website: "https://starbucks.co.in",
          address: {
            street: "UB City, Vittal Mallya Road",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560001"
          }
        },
        owner: brandOwners[1] ? (brandOwners[1] as any)._id : (brandOwners[0] as any)._id,
        categories: ["cafe", "premium", "coffee"],
        isActive: true,
        verified: true,
        rating: 4.6,
        totalSpaces: 15,
        socialMedia: {
          facebook: "https://facebook.com/starbucksindia",
          instagram: "https://instagram.com/starbucksindia",
          twitter: "https://twitter.com/starbucksindia",
          linkedin: "https://linkedin.com/company/starbucks-india"
        },
        status: "active",
        tags: ["premium", "coffee", "business", "quiet", "professional"],
        businessHours: {
          monday: "6:00-22:00",
          tuesday: "6:00-22:00",
          wednesday: "6:00-22:00",
          thursday: "6:00-22:00",
          friday: "6:00-22:00",
          saturday: "6:00-22:00",
          sunday: "6:00-22:00"
        },
        totalBookings: 1800,
        totalRevenue: 270000
      },
      {
        name: "WeWork India",
        description: "Global coworking giant with premium facilities, networking events, and a professional community of entrepreneurs and businesses.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@wework.co.in",
          phone: "+91-80-4115-5555",
          website: "https://wework.co.in",
          address: {
            street: "UB City, Vittal Mallya Road",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560001"
          }
        },
        owner: brandOwners[2] ? (brandOwners[2] as any)._id : (brandOwners[0] as any)._id,
        categories: ["coworking", "premium", "global"],
        isActive: true,
        verified: true,
        rating: 4.8,
        totalSpaces: 10,
        socialMedia: {
          facebook: "https://facebook.com/weworkindia",
          instagram: "https://instagram.com/weworkindia",
          twitter: "https://twitter.com/weworkindia",
          linkedin: "https://linkedin.com/company/wework-india"
        },
        status: "active",
        tags: ["premium", "global", "networking", "professional", "enterprise"],
        businessHours: {
          monday: "8:00-20:00",
          tuesday: "8:00-20:00",
          wednesday: "8:00-20:00",
          thursday: "8:00-20:00",
          friday: "8:00-20:00",
          saturday: "9:00-17:00",
          sunday: "Closed"
        },
        totalBookings: 1500,
        totalRevenue: 450000
      },
      {
        name: "The Hive",
        description: "Local coworking space with a community focus, regular workshops, and a supportive environment for startups and freelancers.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@thehive.co.in",
          phone: "+91-44-4115-5555",
          website: "https://thehive.co.in",
          address: {
            street: "Alwarpet, Chennai",
            city: "Chennai",
            state: "Tamil Nadu",
            country: "India",
            postalCode: "600018"
          }
        },
        owner: (brandOwners[0] as any)._id,
        categories: ["coworking", "community", "local"],
        isActive: true,
        verified: false,
        rating: 4.4,
        totalSpaces: 3,
        socialMedia: {
          facebook: "https://facebook.com/thehivechennai",
          instagram: "https://instagram.com/thehivechennai",
          twitter: "https://twitter.com/thehivechennai"
        },
        status: "active",
        tags: ["community", "workshops", "startup", "local", "supportive"],
        businessHours: {
          monday: "9:00-18:00",
          tuesday: "9:00-18:00",
          wednesday: "9:00-18:00",
          thursday: "9:00-18:00",
          friday: "9:00-18:00",
          saturday: "10:00-16:00",
          sunday: "Closed"
        },
        totalBookings: 320,
        totalRevenue: 64000
      },
      {
        name: "Costa Coffee India",
        description: "British coffee chain with comfortable seating and reliable WiFi, perfect for casual work sessions and informal meetings.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "info@costacoffee.co.in",
          phone: "+91-80-4115-5555",
          website: "https://costacoffee.co.in",
          address: {
            street: "UB City, Vittal Mallya Road",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560001"
          }
        },
        owner: brandOwners[1] ? (brandOwners[1] as any)._id : (brandOwners[0] as any)._id,
        categories: ["cafe", "casual", "british"],
        isActive: true,
        verified: true,
        rating: 4.2,
        totalSpaces: 8,
        socialMedia: {
          facebook: "https://facebook.com/costacoffeeindia",
          instagram: "https://instagram.com/costacoffeeindia",
          twitter: "https://twitter.com/costacoffeeindia",
          linkedin: "https://linkedin.com/company/costa-coffee-india"
        },
        status: "active",
        tags: ["cafe", "casual", "comfortable", "british", "reliable"],
        businessHours: {
          monday: "8:00-22:00",
          tuesday: "8:00-22:00",
          wednesday: "8:00-22:00",
          thursday: "8:00-22:00",
          friday: "8:00-22:00",
          saturday: "8:00-22:00",
          sunday: "8:00-22:00"
        },
        totalBookings: 650,
        totalRevenue: 97500
      },
      {
        name: "91springboard",
        description: "Startup accelerator and coworking space with mentorship programs, investor connections, and a vibrant startup ecosystem.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@91springboard.com",
          phone: "+91-80-4115-5555",
          website: "https://91springboard.com",
          address: {
            street: "Koramangala, Bangalore",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560034"
          }
        },
        owner: brandOwners[2] ? (brandOwners[2] as any)._id : (brandOwners[0] as any)._id,
        categories: ["coworking", "accelerator", "startup"],
        isActive: true,
        verified: true,
        rating: 4.7,
        totalSpaces: 7,
        socialMedia: {
          facebook: "https://facebook.com/91springboard",
          instagram: "https://instagram.com/91springboard",
          twitter: "https://twitter.com/91springboard",
          linkedin: "https://linkedin.com/company/91springboard"
        },
        status: "active",
        tags: ["startup", "accelerator", "mentorship", "investor", "ecosystem"],
        businessHours: {
          monday: "9:00-19:00",
          tuesday: "9:00-19:00",
          wednesday: "9:00-19:00",
          thursday: "9:00-19:00",
          friday: "9:00-19:00",
          saturday: "10:00-16:00",
          sunday: "Closed"
        },
        totalBookings: 890,
        totalRevenue: 178000
      },
      {
        name: "Blue Tokai Coffee",
        description: "Specialty coffee roastery with workspace areas, perfect for coffee enthusiasts and remote workers who appreciate quality coffee.",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
        ],
        contact: {
          email: "hello@bluetokaicoffee.com",
          phone: "+91-80-4115-5555",
          website: "https://bluetokaicoffee.com",
          address: {
            street: "Koramangala, Bangalore",
            city: "Bangalore",
            state: "Karnataka",
            country: "India",
            postalCode: "560034"
          }
        },
        owner: (brandOwners[0] as any)._id,
        categories: ["cafe", "specialty", "roastery"],
        isActive: true,
        verified: true,
        rating: 4.5,
        totalSpaces: 5,
        socialMedia: {
          facebook: "https://facebook.com/bluetokaicoffee",
          instagram: "https://instagram.com/bluetokaicoffee",
          twitter: "https://twitter.com/bluetokaicoffee",
          linkedin: "https://linkedin.com/company/blue-tokai-coffee"
        },
        status: "active",
        tags: ["specialty coffee", "quiet", "quality", "roastery", "artisan"],
        businessHours: {
          monday: "8:00-20:00",
          tuesday: "8:00-20:00",
          wednesday: "8:00-20:00",
          thursday: "8:00-20:00",
          friday: "8:00-20:00",
          saturday: "8:00-20:00",
          sunday: "8:00-20:00"
        },
        totalBookings: 420,
        totalRevenue: 84000
      }
    ];

    // Clear existing brands
    console.log('🧹 Clearing existing brands...');
    // Note: In production, you might want to be more selective about clearing data

    // Create brands
    console.log('🏢 Creating brands...');
    for (const brandData of sampleBrands) {
      try {
        const brand = await brandsService.create(brandData);
        console.log(`✅ Created brand: ${brand.name}`);
      } catch (error) {
        console.error(`❌ Failed to create brand ${brandData.name}:`, error.message);
      }
    }

    console.log('🎉 Brands seeding completed!');
    console.log(`📊 Created ${sampleBrands.length} brands`);

  } catch (error) {
    console.error('❌ Error during brands seeding:', error);
  } finally {
    await app.close();
  }
}

// Run the seeding function
seedBrands().catch(console.error);
