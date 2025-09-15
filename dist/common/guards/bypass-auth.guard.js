"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BypassAuthGuard = void 0;
const common_1 = require("@nestjs/common");
let BypassAuthGuard = class BypassAuthGuard {
    canActivate(context) {
        console.log('🔧 Bypass Auth Guard - canActivate called');
        const request = context.switchToHttp().getRequest();
        request.user = {
            sub: '68c5c4fcff55abf88bb8d231',
            email: 'john.doe@example.com',
            role: 'consumer'
        };
        console.log('🔧 Bypass Auth Guard - Mock user set:', request.user);
        return true;
    }
};
exports.BypassAuthGuard = BypassAuthGuard;
exports.BypassAuthGuard = BypassAuthGuard = __decorate([
    (0, common_1.Injectable)()
], BypassAuthGuard);
//# sourceMappingURL=bypass-auth.guard.js.map