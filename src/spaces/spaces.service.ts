import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space, SpaceDocument } from './schemas/space.schema';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { QuerySpacesDto } from './dto/query-spaces.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
    try {
      const createdSpace = new this.spaceModel(createSpaceDto);
      return await createdSpace.save();
    } catch (error) {
      throw new BadRequestException('Failed to create space: ' + error.message);
    }
  }

  async findAll(queryDto: QuerySpacesDto): Promise<{ spaces: Space[]; total: number; page: number; totalPages: number }> {
    const {
      search,
      city,
      category,
      amenities,
      minPrice,
      maxPrice,
      minCapacity,
      featured,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = queryDto;

    // Build filter object
    const filter: any = { isActive: true };

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
      if (minPrice !== undefined) filter.pricePerHour.$gte = minPrice;
      if (maxPrice !== undefined) filter.pricePerHour.$lte = maxPrice;
    }

    if (minCapacity) {
      filter.capacity = { $gte: minCapacity };
    }

    // Featured filter removed as it's not in the simplified schema

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort: any = {};
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
    } catch (error) {
      throw new BadRequestException('Failed to fetch spaces: ' + error.message);
    }
  }

  async findOne(id: string): Promise<Space> {
    try {
      const space = await this.spaceModel
        .findById(id)
        .populate('brand', 'name logo description contact')
        .exec();

      if (!space) {
        throw new NotFoundException('Space not found');
      }

      return space;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch space: ' + error.message);
    }
  }

  async update(id: string, updateSpaceDto: UpdateSpaceDto): Promise<Space> {
    try {
      const updatedSpace = await this.spaceModel
        .findByIdAndUpdate(id, updateSpaceDto, { new: true })
        .populate('brand', 'name logo')
        .exec();

      if (!updatedSpace) {
        throw new NotFoundException('Space not found');
      }

      return updatedSpace;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update space: ' + error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.spaceModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Space not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete space: ' + error.message);
    }
  }

  async findFeatured(): Promise<Space[]> {
    try {
      return await this.spaceModel
        .find({ isActive: true })
        .populate('brand', 'name logo')
        .sort({ createdAt: -1 })
        .limit(6)
        .exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch featured spaces: ' + error.message);
    }
  }

  async findByBrand(brandId: string): Promise<Space[]> {
    try {
      return await this.spaceModel
        .find({ brand: brandId, isActive: true })
        .populate('brand', 'name logo')
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch brand spaces: ' + error.message);
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = await this.spaceModel.distinct('category', { isActive: true });
      return categories.filter(cat => cat && cat !== 'general');
    } catch (error) {
      throw new BadRequestException('Failed to fetch categories: ' + error.message);
    }
  }

  async getAmenities(): Promise<string[]> {
    try {
      const amenities = await this.spaceModel.distinct('amenities', { isActive: true });
      return amenities.flat().filter((amenity, index, arr) => arr.indexOf(amenity) === index);
    } catch (error) {
      throw new BadRequestException('Failed to fetch amenities: ' + error.message);
    }
  }
}


