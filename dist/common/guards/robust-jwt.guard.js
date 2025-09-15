"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobustJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let RobustJwtGuard = class RobustJwtGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        console.log('🔧 Robust JWT Guard - Checking authentication');
        console.log('🔧 Robust JWT Guard - Auth header:', authHeader ? 'Present' : 'Missing');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ Robust JWT Guard - No Bearer token found');
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.substring(7);
        console.log('🔧 Robust JWT Guard - Token found:', token.substring(0, 20) + '...');
        try {
            const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345';
            console.log('🔧 Robust JWT Guard - Using secret:', secret ? 'Set' : 'Using fallback');
            const payload = this.jwtService.verify(token, { secret });
            console.log('✅ Robust JWT Guard - Token verified successfully');
            console.log('🔍 Robust JWT Guard - Payload:', payload);
            if (!payload.sub) {
                console.log('❌ Robust JWT Guard - No sub in payload');
                throw new common_1.UnauthorizedException('Invalid token payload');
            }
            request.user = {
                sub: payload.sub,
                email: payload.email,
                role: payload.role
            };
            console.log('✅ Robust JWT Guard - User set in request:', request.user);
            return true;
        }
        catch (error) {
            console.log('❌ Robust JWT Guard - Token verification failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.RobustJwtGuard = RobustJwtGuard;
exports.RobustJwtGuard = RobustJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RobustJwtGuard);
//# sourceMappingURL=robust-jwt.guard.js.map