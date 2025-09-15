import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

async function testJWT() {
  console.log('🔐 Testing JWT for Jane Smith...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const jwtService = app.get(JwtService);

  try {
    // Find Jane Smith
    const janeSmith = await usersService.findByEmail('jane.smith@brand.com');
    if (!janeSmith) {
      console.log('❌ Jane Smith not found');
      return;
    }

    console.log('✅ Jane Smith found:', janeSmith.email);

    // Create a JWT token for Jane Smith
    const payload = {
      sub: janeSmith._id.toString(),
      email: janeSmith.email,
      role: janeSmith.role
    };

    const token = jwtService.sign(payload);
    console.log('✅ Generated JWT token:', token);

    // Test the token
    try {
      const decoded = jwtService.verify(token);
      console.log('✅ JWT token is valid');
      console.log('  - Decoded payload:', decoded);
    } catch (error) {
      console.log('❌ JWT token is invalid:', error.message);
    }

  } catch (error) {
    console.error('❌ Error testing JWT:', error);
  } finally {
    await app.close();
  }
}

testJWT();
