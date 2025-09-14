import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { QueryBrandsDto } from './dto/query-brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const createdBrand = new this.brandModel(createBrandDto);
      return await createdBrand.save();
    } catch (error) {
      throw new BadRequestException('Failed to create brand: ' + error.message);
    }
  }

  async findAll(queryDto: QueryBrandsDto): Promise<{ brands: Brand[]; total: number; page: number; totalPages: number }> {
    const {
      search,
      city,
      categories,
      verified,
      isActive,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = queryDto;

    // Build filter object
    const filter: any = {};

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

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort: any = {};
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
    } catch (error) {
      throw new BadRequestException('Failed to fetch brands: ' + error.message);
    }
  }

  async findOne(id: string): Promise<Brand> {
    try {
      const brand = await this.brandModel
        .findById(id)
        .populate('owner', 'firstName lastName email phone')
        .exec();

      if (!brand) {
        throw new NotFoundException('Brand not found');
      }

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch brand: ' + error.message);
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const updatedBrand = await this.brandModel
        .findByIdAndUpdate(id, updateBrandDto, { new: true })
        .populate('owner', 'firstName lastName email')
        .exec();

      if (!updatedBrand) {
        throw new NotFoundException('Brand not found');
      }

      return updatedBrand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update brand: ' + error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.brandModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Brand not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete brand: ' + error.message);
    }
  }

  async findByOwner(ownerId: string): Promise<Brand[]> {
    try {
      return await this.brandModel
        .find({ owner: ownerId, isActive: true })
        .populate('owner', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch owner brands: ' + error.message);
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = await this.brandModel.distinct('categories', { isActive: true });
      return categories.flat().filter((cat, index, arr) => arr.indexOf(cat) === index);
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories: ' + error.message);
    }
  }

  async getVerifiedBrands(): Promise<Brand[]> {
    try {
      return await this.brandModel
        .find({ verified: true, isActive: true })
        .populate('owner', 'firstName lastName email')
        .sort({ rating: -1, totalSpaces: -1 })
        .limit(10)
        .exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch verified brands: ' + error.message);
    }
  }

  async updateStats(brandId: string, stats: { totalSpaces?: number; totalBookings?: number; totalRevenue?: number; rating?: number }): Promise<Brand> {
    try {
      const updatedBrand = await this.brandModel
        .findByIdAndUpdate(brandId, { $set: stats }, { new: true })
        .exec();

      if (!updatedBrand) {
        throw new NotFoundException('Brand not found');
      }

      return updatedBrand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update brand stats: ' + error.message);
    }
  }
}

