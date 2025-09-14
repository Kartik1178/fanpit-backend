export declare class LocationDto {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
}
export declare class OperatingHoursDto {
    open: string;
    close: string;
}
export declare class CreateSpaceDto {
    name: string;
    description: string;
    images?: string[];
    location: LocationDto;
    brand: string;
    amenities?: string[];
    capacity: number;
    pricePerHour: number;
    operatingHours?: OperatingHoursDto;
    peakPricing?: Record<string, number>;
    isActive?: boolean;
    tags?: string[];
    category?: string;
}
