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
exports.SpaceSchema = exports.Space = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Space = class Space {
};
exports.Space = Space;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Space.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Space.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Space.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String, required: false },
            lat: { type: Number, required: false },
            lng: { type: Number, required: false }
        },
        required: true
    }),
    __metadata("design:type", Object)
], Space.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Brand', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Space.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Space.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Space.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Space.prototype, "pricePerHour", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            open: { type: String, required: true },
            close: { type: String, required: true }
        },
        required: true,
        default: { open: "09:00", close: "18:00" }
    }),
    __metadata("design:type", Object)
], Space.prototype, "operatingHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: Number }),
    __metadata("design:type", Map)
], Space.prototype, "peakPricing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Space.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Space.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'general' }),
    __metadata("design:type", String)
], Space.prototype, "category", void 0);
exports.Space = Space = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Space);
exports.SpaceSchema = mongoose_1.SchemaFactory.createForClass(Space);
//# sourceMappingURL=space.schema.js.map