declare const JwtAuthNewGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthNewGuard extends JwtAuthNewGuard_base {
    canActivate(context: any): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
