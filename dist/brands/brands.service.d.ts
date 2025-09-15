import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { QueryBrandsDto } from './dto/query-brands.dto';
export declare class BrandsService {
    private brandModel;
    constructor(brandModel: Model<BrandDocument>);
    create(createBrandDto: CreateBrandDto): Promise<Brand>;
    findAll(queryDto: QueryBrandsDto): Promise<{
        brands: Brand[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto, ownerId?: string): Promise<Brand>;
    remove(id: string, ownerId?: string): Promise<void>;
    findByOwner(ownerId: string): Promise<Brand[]>;
    getCategories(): Promise<string[]>;
    getVerifiedBrands(): Promise<Brand[]>;
    updateStats(brandId: string, stats: {
        totalSpaces?: number;
        totalBookings?: number;
        totalRevenue?: number;
        rating?: number;
    }): Promise<Brand>;
    getBrandAnalytics(brandId: string, ownerId: string): Promise<any>;
    getBrandSpaces(brandId: string, ownerId: string): Promise<any[]>;
    getBrandStats(brandId: string, ownerId: string): Promise<any>;
}
