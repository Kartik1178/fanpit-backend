import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { QueryBrandsDto } from './dto/query-brands.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    create(createBrandDto: CreateBrandDto, req: any): Promise<import("./schemas/brand.schema").Brand>;
    findAll(queryDto: QueryBrandsDto): Promise<{
        brands: import("./schemas/brand.schema").Brand[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getVerifiedBrands(): Promise<import("./schemas/brand.schema").Brand[]>;
    getCategories(): Promise<string[]>;
    findByOwner(ownerId: string): Promise<import("./schemas/brand.schema").Brand[]>;
    getMyBrands(req: any): Promise<import("./schemas/brand.schema").Brand[]>;
    findOne(id: string): Promise<import("./schemas/brand.schema").Brand>;
    update(id: string, updateBrandDto: UpdateBrandDto, req: any): Promise<import("./schemas/brand.schema").Brand>;
    remove(id: string): Promise<void>;
}
