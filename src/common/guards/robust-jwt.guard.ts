import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RobustJwtGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log('🔧 RobustJwtGuard - canActivate called');
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log('🔧 RobustJwtGuard - handleRequest called');
    console.log('🔧 RobustJwtGuard - Error:', err);
    console.log('🔧 RobustJwtGuard - User:', user);
    console.log('🔧 RobustJwtGuard - Info:', info);

    if (err || !user) {
      console.log('🔧 RobustJwtGuard - Authentication failed:', err || 'No user');
      throw err || new UnauthorizedException('Authentication failed');
    }

    console.log('🔧 RobustJwtGuard - Authentication successful');
    return user;
  }
}