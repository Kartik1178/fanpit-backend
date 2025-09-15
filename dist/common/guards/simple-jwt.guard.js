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
exports.SimpleJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let SimpleJwtGuard = class SimpleJwtGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('❌ Simple JWT Guard - No Bearer token found');
            throw new common_1.UnauthorizedException('No token provided');
        }
        const token = authHeader.substring(7);
        console.log('🔧 Simple JWT Guard - Token found:', token.substring(0, 20) + '...');
        try {
            const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345';
            console.log('🔧 Simple JWT Guard - Using secret:', secret ? 'Set' : 'Using fallback');
            const payload = this.jwtService.verify(token, { secret });
            console.log('✅ Simple JWT Guard - Token verified successfully');
            console.log('🔍 Simple JWT Guard - Payload:', payload);
            request.user = {
                sub: payload.sub,
                email: payload.email,
                role: payload.role
            };
            return true;
        }
        catch (error) {
            console.log('❌ Simple JWT Guard - Token verification failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.SimpleJwtGuard = SimpleJwtGuard;
exports.SimpleJwtGuard = SimpleJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SimpleJwtGuard);
//# sourceMappingURL=simple-jwt.guard.js.map