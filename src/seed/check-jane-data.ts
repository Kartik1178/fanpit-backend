import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { BrandsService } from '../brands/brands.service';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkJaneData() {
  console.log('🔍 Checking Jane Smith data...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const brandsService = app.get(BrandsService);

  try {
    // Find Jane Smith
    const janeSmith = await usersService.findByEmail('jane.smith@brand.com');
    if (!janeSmith) {
      console.log('❌ Jane Smith not found in database');
      return;
    }

    console.log('✅ Jane Smith found:');
    console.log('  - ID:', janeSmith._id);
    console.log('  - Email:', janeSmith.email);
    console.log('  - Role:', janeSmith.role);
    console.log('  - Owned Brands:', janeSmith.ownedBrands);

    // Check if she has any brands
    if (janeSmith.ownedBrands && janeSmith.ownedBrands.length > 0) {
      console.log('✅ Jane Smith has owned brands:');
      for (const brandId of janeSmith.ownedBrands) {
        const brand = await brandsService.findOne(brandId.toString());
        if (brand) {
          console.log(`  - Brand: ${brand.name} (ID: ${(brand as any)._id})`);
        } else {
          console.log(`  - Brand ID ${brandId} not found`);
        }
      }
    } else {
      console.log('❌ Jane Smith has no owned brands');
    }

    // Check all brands in the database
    const allBrands = await brandsService.findAll({});
    console.log(`\n📊 Total brands in database: ${allBrands.brands.length}`);
    allBrands.brands.forEach((brand: any) => {
      console.log(`  - ${brand.name} (Owner: ${brand.owner})`);
    });

  } catch (error) {
    console.error('❌ Error checking Jane Smith data:', error);
  } finally {
    await app.close();
  }
}

checkJaneData();
