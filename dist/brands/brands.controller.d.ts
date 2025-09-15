import { BrandsService } from './brands.service';
import { SpacesService } from '../spaces/spaces.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    private readonly spacesService;
    constructor(brandsService: BrandsService, spacesService: SpacesService);
    create(createBrandDto: CreateBrandDto, req: any): Promise<import("./schemas/brand.schema").Brand>;
    findAll(): Promise<{
        brands: import("./schemas/brand.schema").Brand[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findMyBrands(req: any): Promise<{
        id: any;
        name: any;
        description: any;
        logo: any;
        verified: any;
        status: string;
        totalSpaces: any;
        totalBookings: any;
        totalRevenue: any;
        staffCount: any;
    }[]>;
    findOne(id: string): Promise<import("./schemas/brand.schema").Brand>;
    getBrandSpaces(id: string, req: any): Promise<any[]>;
    update(id: string, updateBrandDto: UpdateBrandDto, req: any): Promise<import("./schemas/brand.schema").Brand>;
    remove(id: string, req: any): Promise<void>;
    getBrandAnalytics(id: string, req: any): Promise<any>;
}
