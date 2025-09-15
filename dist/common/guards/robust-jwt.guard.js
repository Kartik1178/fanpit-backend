"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobustJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let RobustJwtGuard = class RobustJwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        console.log('🔧 RobustJwtGuard - canActivate called');
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        console.log('🔧 RobustJwtGuard - handleRequest called');
        console.log('🔧 RobustJwtGuard - Error:', err);
        console.log('🔧 RobustJwtGuard - User:', user);
        console.log('🔧 RobustJwtGuard - Info:', info);
        if (err || !user) {
            console.log('🔧 RobustJwtGuard - Authentication failed:', err || 'No user');
            throw err || new common_1.UnauthorizedException('Authentication failed');
        }
        console.log('🔧 RobustJwtGuard - Authentication successful');
        return user;
    }
};
exports.RobustJwtGuard = RobustJwtGuard;
exports.RobustJwtGuard = RobustJwtGuard = __decorate([
    (0, common_1.Injectable)()
], RobustJwtGuard);
//# sourceMappingURL=robust-jwt.guard.js.map