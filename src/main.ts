import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables - try multiple paths for different environments
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
} else {
  // In production, environment variables should be set by the platform
  console.log('Running in production mode - using platform environment variables');
}

// Debug: Check if environment variables are loaded
console.log('MONGO_URI =>', process.env.MONGO_URI);
console.log('JWT_SECRET =>', process.env.JWT_SECRET ? 'SET' : 'NOT SET');

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: { origin: true, credentials: true }});
    app.use(cookieParser());
    app.use(helmet());
    app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));
    // raw body for webhook route (we'll mount later on specific route)
    
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 App running on port ${port}`);
    console.log(`📱 Server is ready and listening for requests`);
    console.log(`🌐 Access your app at: http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Failed to start the application:', error.message);
    if (error.code === 'EADDRINUSE') {
      console.log('💡 Port is already in use. Try using a different port or kill the process using that port.');
    }
    process.exit(1);
  }
}
bootstrap();
