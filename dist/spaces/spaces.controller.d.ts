import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { QuerySpacesDto } from './dto/query-spaces.dto';
export declare class SpacesController {
    private readonly spacesService;
    constructor(spacesService: SpacesService);
    create(createSpaceDto: CreateSpaceDto, req: any): Promise<import("./schemas/space.schema").Space>;
    findAll(queryDto: QuerySpacesDto): Promise<{
        spaces: import("./schemas/space.schema").Space[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findFeatured(): Promise<import("./schemas/space.schema").Space[]>;
    getCategories(): Promise<string[]>;
    getAmenities(): Promise<string[]>;
    findByBrand(brandId: string): Promise<import("./schemas/space.schema").Space[]>;
    findOne(id: string): Promise<import("./schemas/space.schema").Space>;
    updatePut(id: string, updateSpaceDto: UpdateSpaceDto, req: any): Promise<import("./schemas/space.schema").Space>;
    update(id: string, updateSpaceDto: UpdateSpaceDto, req: any): Promise<import("./schemas/space.schema").Space>;
    remove(id: string): Promise<void>;
}
