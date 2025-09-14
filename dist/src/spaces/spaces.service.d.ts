import { Model } from 'mongoose';
import { Space, SpaceDocument } from './schemas/space.schema';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { QuerySpacesDto } from './dto/query-spaces.dto';
export declare class SpacesService {
    private spaceModel;
    constructor(spaceModel: Model<SpaceDocument>);
    create(createSpaceDto: CreateSpaceDto): Promise<Space>;
    findAll(queryDto: QuerySpacesDto): Promise<{
        spaces: Space[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Space>;
    update(id: string, updateSpaceDto: UpdateSpaceDto): Promise<Space>;
    remove(id: string): Promise<void>;
    findFeatured(): Promise<Space[]>;
    findByBrand(brandId: string): Promise<Space[]>;
    getCategories(): Promise<string[]>;
    getAmenities(): Promise<string[]>;
}
