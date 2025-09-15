"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const loyalty_controller_1 = require("./loyalty.controller");
const loyalty_service_1 = require("./loyalty.service");
const loyalty_program_schema_1 = require("./schemas/loyalty-program.schema");
const loyalty_member_schema_1 = require("./schemas/loyalty-member.schema");
const loyalty_reward_schema_1 = require("./schemas/loyalty-reward.schema");
const auth_module_1 = require("../auth/auth.module");
let LoyaltyModule = class LoyaltyModule {
};
exports.LoyaltyModule = LoyaltyModule;
exports.LoyaltyModule = LoyaltyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: loyalty_program_schema_1.LoyaltyProgram.name, schema: loyalty_program_schema_1.LoyaltyProgramSchema },
                { name: loyalty_member_schema_1.LoyaltyMember.name, schema: loyalty_member_schema_1.LoyaltyMemberSchema },
                { name: loyalty_reward_schema_1.LoyaltyReward.name, schema: loyalty_reward_schema_1.LoyaltyRewardSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [loyalty_controller_1.LoyaltyController],
        providers: [loyalty_service_1.LoyaltyService],
        exports: [loyalty_service_1.LoyaltyService],
    })
], LoyaltyModule);
//# sourceMappingURL=loyalty.module.js.map