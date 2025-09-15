import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class BypassAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('🔧 Bypass Auth Guard - canActivate called');
    
    const request = context.switchToHttp().getRequest();
    
    // Set a mock user for testing
    request.user = {
      sub: '68c5c4fcff55abf88bb8d231',
      email: 'john.doe@example.com',
      role: 'consumer'
    };
    
    console.log('🔧 Bypass Auth Guard - Mock user set:', request.user);
    return true;
  }
}
