import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StaffPermission } from '../../users/schemas/user.schema';
export declare const BRAND_ACCESS_KEY = "brand_access";
export declare const BrandAccess: (permissions?: StaffPermission[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class BrandAccessGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
