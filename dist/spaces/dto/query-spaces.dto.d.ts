export declare class QuerySpacesDto {
    search?: string;
    city?: string;
    category?: string;
    amenities?: string[];
    minPrice?: number;
    maxPrice?: number;
    minCapacity?: number;
    featured?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
