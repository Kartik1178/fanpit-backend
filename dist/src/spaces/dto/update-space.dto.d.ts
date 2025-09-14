export declare class LocationDto {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
}
export declare class UpdateSpaceDto {
    name?: string;
    description?: string;
    images?: string[];
    location?: LocationDto;
    brand?: string;
    amenities?: string[];
    capacity?: number;
    pricePerHour?: number;
    peakPricing?: Record<string, number>;
    isActive?: boolean;
    tags?: string[];
    category?: string;
}
