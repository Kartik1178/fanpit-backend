"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthNewGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthNewGuard = class JwtAuthNewGuard extends (0, passport_1.AuthGuard)('jwt-new') {
    canActivate(context) {
        console.log('🔧 JWT Auth New Guard - canActivate called');
        return super.canActivate(context);
    }
};
exports.JwtAuthNewGuard = JwtAuthNewGuard;
exports.JwtAuthNewGuard = JwtAuthNewGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthNewGuard);
//# sourceMappingURL=jwt-auth-new.guard.js.map