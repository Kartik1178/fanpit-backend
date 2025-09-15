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
exports.EarnPointsDto = void 0;
const class_validator_1 = require("class-validator");
const loyalty_member_schema_1 = require("../schemas/loyalty-member.schema");
class EarnPointsDto {
}
exports.EarnPointsDto = EarnPointsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EarnPointsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EarnPointsDto.prototype, "brandId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(loyalty_member_schema_1.PointsSource),
    __metadata("design:type", String)
], EarnPointsDto.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], EarnPointsDto.prototype, "points", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EarnPointsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EarnPointsDto.prototype, "bookingId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], EarnPointsDto.prototype, "metadata", void 0);
//# sourceMappingURL=earn-points.dto.js.map