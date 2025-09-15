import { Injectable, CanActivate, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, StaffPermission } from '../../users/schemas/user.schema';

export const BRAND_ACCESS_KEY = 'brand_access';
export const BrandAccess = (permissions?: StaffPermission[]) => 
  SetMetadata(BRAND_ACCESS_KEY, { permissions });

@Injectable()
export class BrandAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const brandId = request.params.brandId || request.body.brandId;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Admin has access to everything
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Brand owner has full access to their brands
    if (user.role === UserRole.BRAND_OWNER) {
      // Check if user owns this brand
      if (user.ownedBrands && user.ownedBrands.includes(brandId)) {
        return true;
      }
    }

    // Staff members need specific permissions
    if (user.role === UserRole.STAFF) {
      const staffAssignment = user.staffAssignments?.find(
        assignment => assignment.brand.toString() === brandId && assignment.isActive
      );

      if (!staffAssignment) {
        throw new ForbiddenException('No access to this brand');
      }

      const requiredPermissions = this.reflector.getAllAndOverride<StaffPermission[]>(
        BRAND_ACCESS_KEY,
        [context.getHandler(), context.getClass()]
      );

      if (requiredPermissions && requiredPermissions.length > 0) {
        const hasPermission = requiredPermissions.some(permission =>
          staffAssignment.permissions.includes(permission)
        );

        if (!hasPermission) {
          throw new ForbiddenException('Insufficient permissions for this brand');
        }
      }

      return true;
    }

    // Consumers have no brand access
    throw new ForbiddenException('No access to brand resources');
  }
}
