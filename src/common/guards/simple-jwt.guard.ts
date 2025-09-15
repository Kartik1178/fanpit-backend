import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SimpleJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Simple JWT Guard - No Bearer token found');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('🔧 Simple JWT Guard - Token found:', token.substring(0, 20) + '...');

    try {
      const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345';
      console.log('🔧 Simple JWT Guard - Using secret:', secret ? 'Set' : 'Using fallback');
      
      const payload = this.jwtService.verify(token, { secret });
      console.log('✅ Simple JWT Guard - Token verified successfully');
      console.log('🔍 Simple JWT Guard - Payload:', payload);

      // Set user in request
      request.user = {
        sub: payload.sub,
        email: payload.email,
        role: payload.role
      };

      return true;
    } catch (error) {
      console.log('❌ Simple JWT Guard - Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
