export declare class QueryBrandsDto {
    search?: string;
    city?: string;
    categories?: string[];
    verified?: boolean;
    isActive?: boolean;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
