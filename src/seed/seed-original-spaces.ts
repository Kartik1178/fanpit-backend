import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SpacesService } from '../spaces/spaces.service';
import { BrandsService } from '../brands/brands.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function seedOriginalSpaces() {
  console.log('🏠 Starting original spaces restoration...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const spacesService = app.get(SpacesService);
  const brandsService = app.get(BrandsService);

  try {
    // Get existing brands
    const brands = await brandsService.findAll({});
    console.log(`Found ${brands.brands.length} brands`);

    // Original spaces that were in the system
    const originalSpaces = [
      {
        name: "Downtown Creative Hub",
        description: "A vibrant co-working space in the heart of downtown, perfect for creative professionals and entrepreneurs.",
        capacity: 25,
        pricePerHour: 20,
        amenities: ["WiFi", "Coffee", "Meeting rooms", "Printing", "Parking"],
        category: "coworking",
        tags: ["creative", "downtown", "entrepreneur"]
      },
      {
        name: "Cozy Corner Café",
        description: "A warm and inviting café space with comfortable seating, perfect for casual meetings and remote work.",
        capacity: 15,
        pricePerHour: 12,
        amenities: ["WiFi", "Coffee", "Food", "Outdoor seating"],
        category: "cafe",
        tags: ["cozy", "cafe", "casual"]
      },
      {
        name: "Tech Startup Lounge",
        description: "Modern tech-focused workspace with high-speed internet and collaborative areas for startups.",
        capacity: 30,
        pricePerHour: 25,
        amenities: ["WiFi", "Projectors", "Whiteboards", "Coffee", "Snacks"],
        category: "tech",
        tags: ["tech", "startup", "modern"]
      },
      {
        name: "Quiet Study Room",
        description: "A peaceful, distraction-free environment perfect for focused work and study sessions.",
        capacity: 8,
        pricePerHour: 15,
        amenities: ["WiFi", "Desk lamps", "Quiet environment"],
        category: "study",
        tags: ["quiet", "study", "focused"]
      },
      {
        name: "Conference Center",
        description: "Professional conference facility with state-of-the-art presentation equipment.",
        capacity: 50,
        pricePerHour: 40,
        amenities: ["WiFi", "Projectors", "Sound system", "Catering", "Parking"],
        category: "conference",
        tags: ["professional", "conference", "presentation"]
      },
      {
        name: "Art Studio Space",
        description: "Spacious art studio with natural lighting, perfect for artists and creative workshops.",
        capacity: 12,
        pricePerHour: 18,
        amenities: ["Natural light", "Art supplies", "Sink", "Storage"],
        category: "art",
        tags: ["art", "creative", "studio"]
      }
    ];

    console.log('🏗️ Creating original spaces...');
    
    for (const spaceData of originalSpaces) {
      // Assign to a random brand or the first brand
      const brand = brands.brands[Math.floor(Math.random() * brands.brands.length)];
      
      try {
        await spacesService.create({
          ...spaceData,
          brand: (brand as any)._id,
          location: {
            address: brand.contact?.address?.street || "123 Main Street",
            city: brand.contact?.address?.city || "San Francisco",
            state: brand.contact?.address?.state || "CA",
            country: brand.contact?.address?.country || "USA",
            postalCode: brand.contact?.address?.postalCode || "94105"
          },
          images: [],
          isActive: true,
        });
        console.log(`✅ Created space: ${spaceData.name} for ${brand.name}`);
      } catch (error) {
        console.log(`❌ Error creating space ${spaceData.name}:`, error.message);
      }
    }

    console.log('\n🎉 Original spaces restoration completed!');
    console.log(`✅ Created ${originalSpaces.length} original spaces`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seedOriginalSpaces().catch(console.error);
