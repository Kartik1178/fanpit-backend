import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    const normalizeRole = (role?: string) => {
      if (!role) return undefined;
      if (role === 'brand_owner') return 'brandOwner';
      return role;
    };
    
    if (!user) {
      return false;
    }
    
    const userRole = normalizeRole(user.role);
    console.log('🚨 RolesGuard called');
    console.log('🔍 Required roles:', requiredRoles);
    console.log('🔍 User role (normalized):', userRole, 'Full user:', user);
    
    return requiredRoles.some((role) => userRole === role);
  }
}