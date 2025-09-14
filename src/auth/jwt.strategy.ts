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
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    console.log('🚨 JWT STRATEGY CALLED!');
    console.log('🔍 JWT Strategy - Payload received:', payload);
    try {
      const user = await this.usersService.findOne(payload.sub);
      console.log('🔍 JWT Strategy - User found:', user ? user.email : 'null');
      if (!user) {
        console.log('❌ JWT Strategy - User not found for ID:', payload.sub);
        throw new UnauthorizedException();
      }
      console.log('✅ JWT Strategy - User validated successfully');
      return { 
        sub: payload.sub, 
        email: payload.email, 
        role: payload.role 
      };
    } catch (error) {
      console.log('❌ JWT Strategy - Error:', error.message);
      throw new UnauthorizedException();
    }
  }
}
