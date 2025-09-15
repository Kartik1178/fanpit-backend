import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const RobustJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RobustJwtGuard extends RobustJwtGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
}
export {};
