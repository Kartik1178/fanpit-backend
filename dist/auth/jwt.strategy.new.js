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
exports.JwtStrategyNew = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const users_service_1 = require("../users/users.service");
let JwtStrategyNew = class JwtStrategyNew extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-new') {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345',
        });
        this.usersService = usersService;
        console.log('🔧 JWT Strategy New - Constructor called');
    }
    async validate(payload) {
        console.log('🚨 JWT STRATEGY NEW CALLED!');
        console.log('🔍 JWT Strategy New - Payload received:', payload);
        if (!payload || !payload.sub) {
            console.log('❌ JWT Strategy New - No payload or sub');
            throw new common_1.UnauthorizedException();
        }
        console.log('✅ JWT Strategy New - User validated successfully');
        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role
        };
    }
};
exports.JwtStrategyNew = JwtStrategyNew;
exports.JwtStrategyNew = JwtStrategyNew = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], JwtStrategyNew);
//# sourceMappingURL=jwt.strategy.new.js.map