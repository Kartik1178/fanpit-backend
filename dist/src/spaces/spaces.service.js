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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const space_schema_1 = require("./schemas/space.schema");
let SpacesService = class SpacesService {
    constructor(spaceModel) {
        this.spaceModel = spaceModel;
    }
    async create(createSpaceDto) {
        try {
            const createdSpace = new this.spaceModel(createSpaceDto);
            return await createdSpace.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create space: ' + error.message);
        }
    }
    async findAll(queryDto) {
        const { search, city, category, amenities, minPrice, maxPrice, minCapacity, featured, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
        const filter = { isActive: true };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 'location.city': { $regex: search, $options: 'i' } },
                { 'location.address': { $regex: search, $options: 'i' } }
            ];
        }
        if (city) {
            filter['location.city'] = { $regex: city, $options: 'i' };
        }
        if (category) {
            filter.category = category;
        }
        if (amenities && amenities.length > 0) {
            filter.amenities = { $in: amenities };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.pricePerHour = {};
            if (minPrice !== undefined)
                filter.pricePerHour.$gte = minPrice;
            if (maxPrice !== undefined)
                filter.pricePerHour.$lte = maxPrice;
        }
        if (minCapacity) {
            filter.capacity = { $gte: minCapacity };
        }
        const skip = (page - 1) * limit;
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        try {
            const [spaces, total] = await Promise.all([
                this.spaceModel
                    .find(filter)
                    .populate('brand', 'name logo')
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.spaceModel.countDocuments(filter)
            ]);
            return {
                spaces,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch spaces: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const space = await this.spaceModel
                .findById(id)
                .populate('brand', 'name logo description contact')
                .exec();
            if (!space) {
                throw new common_1.NotFoundException('Space not found');
            }
            return space;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch space: ' + error.message);
        }
    }
    async update(id, updateSpaceDto) {
        try {
            const updatedSpace = await this.spaceModel
                .findByIdAndUpdate(id, updateSpaceDto, { new: true })
                .populate('brand', 'name logo')
                .exec();
            if (!updatedSpace) {
                throw new common_1.NotFoundException('Space not found');
            }
            return updatedSpace;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update space: ' + error.message);
        }
    }
    async remove(id) {
        try {
            const result = await this.spaceModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Space not found');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete space: ' + error.message);
        }
    }
    async findFeatured() {
        try {
            return await this.spaceModel
                .find({ isActive: true })
                .populate('brand', 'name logo')
                .sort({ createdAt: -1 })
                .limit(6)
                .exec();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch featured spaces: ' + error.message);
        }
    }
    async findByBrand(brandId) {
        try {
            return await this.spaceModel
                .find({ brand: brandId, isActive: true })
                .populate('brand', 'name logo')
                .sort({ createdAt: -1 })
                .exec();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch brand spaces: ' + error.message);
        }
    }
    async getCategories() {
        try {
            const categories = await this.spaceModel.distinct('category', { isActive: true });
            return categories.filter(cat => cat && cat !== 'general');
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch categories: ' + error.message);
        }
    }
    async getAmenities() {
        try {
            const amenities = await this.spaceModel.distinct('amenities', { isActive: true });
            return amenities.flat().filter((amenity, index, arr) => arr.indexOf(amenity) === index);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch amenities: ' + error.message);
        }
    }
};
exports.SpacesService = SpacesService;
exports.SpacesService = SpacesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(space_schema_1.Space.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SpacesService);
//# sourceMappingURL=spaces.service.js.map