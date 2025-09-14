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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brand_schema_1 = require("./schemas/brand.schema");
let BrandsService = class BrandsService {
    constructor(brandModel) {
        this.brandModel = brandModel;
    }
    async create(createBrandDto) {
        try {
            const createdBrand = new this.brandModel(createBrandDto);
            return await createdBrand.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create brand: ' + error.message);
        }
    }
    async findAll(queryDto) {
        const { search, city, categories, verified, isActive, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { 'contact.address.city': { $regex: search, $options: 'i' } },
                { 'contact.address.street': { $regex: search, $options: 'i' } }
            ];
        }
        if (city) {
            filter['contact.address.city'] = { $regex: city, $options: 'i' };
        }
        if (categories && categories.length > 0) {
            filter.categories = { $in: categories };
        }
        if (verified !== undefined) {
            filter.verified = verified;
        }
        if (isActive !== undefined) {
            filter.isActive = isActive;
        }
        const skip = (page - 1) * limit;
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        try {
            const [brands, total] = await Promise.all([
                this.brandModel
                    .find(filter)
                    .populate('owner', 'firstName lastName email')
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.brandModel.countDocuments(filter)
            ]);
            return {
                brands,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch brands: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const brand = await this.brandModel
                .findById(id)
                .populate('owner', 'firstName lastName email phone')
                .exec();
            if (!brand) {
                throw new common_1.NotFoundException('Brand not found');
            }
            return brand;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch brand: ' + error.message);
        }
    }
    async update(id, updateBrandDto) {
        try {
            const updatedBrand = await this.brandModel
                .findByIdAndUpdate(id, updateBrandDto, { new: true })
                .populate('owner', 'firstName lastName email')
                .exec();
            if (!updatedBrand) {
                throw new common_1.NotFoundException('Brand not found');
            }
            return updatedBrand;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update brand: ' + error.message);
        }
    }
    async remove(id) {
        try {
            const result = await this.brandModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Brand not found');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete brand: ' + error.message);
        }
    }
    async findByOwner(ownerId) {
        try {
            return await this.brandModel
                .find({ owner: ownerId, isActive: true })
                .populate('owner', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .exec();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch owner brands: ' + error.message);
        }
    }
    async getCategories() {
        try {
            const categories = await this.brandModel.distinct('categories', { isActive: true });
            return categories.flat().filter((cat, index, arr) => arr.indexOf(cat) === index);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch categories: ' + error.message);
        }
    }
    async getVerifiedBrands() {
        try {
            return await this.brandModel
                .find({ verified: true, isActive: true })
                .populate('owner', 'firstName lastName email')
                .sort({ rating: -1, totalSpaces: -1 })
                .limit(10)
                .exec();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch verified brands: ' + error.message);
        }
    }
    async updateStats(brandId, stats) {
        try {
            const updatedBrand = await this.brandModel
                .findByIdAndUpdate(brandId, { $set: stats }, { new: true })
                .exec();
            if (!updatedBrand) {
                throw new common_1.NotFoundException('Brand not found');
            }
            return updatedBrand;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update brand stats: ' + error.message);
        }
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BrandsService);
//# sourceMappingURL=brands.service.js.map