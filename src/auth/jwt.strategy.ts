import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345',
    });
    console.log('🔧 JWT Strategy - Constructor called');
    console.log('🔧 JWT Strategy - Secret:', process.env.JWT_SECRET ? 'Set' : 'Using fallback');
  }

  async validate(payload: any) {
    console.log('🚨 JWT STRATEGY CALLED!');
    console.log('🔍 JWT Strategy - Payload received:', payload);
    
    // Simplified validation - just return the payload if it exists
    if (!payload || !payload.sub) {
      console.log('❌ JWT Strategy - No payload or sub');
      throw new UnauthorizedException();
    }

    console.log('✅ JWT Strategy - User validated successfully');
    return { 
      sub: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
