export declare class ContactAddressDto {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
}
export declare class ContactDto {
    email: string;
    phone: string;
    website?: string;
    address: ContactAddressDto;
}
export declare class SocialMediaDto {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
}
export declare class BusinessHoursDto {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
}
export declare class CreateBrandDto {
    name: string;
    description: string;
    logo?: string;
    images?: string[];
    contact: ContactDto;
    owner: string;
    categories?: string[];
    isActive?: boolean;
    verified?: boolean;
    rating?: number;
    totalSpaces?: number;
    socialMedia?: SocialMediaDto;
    status?: string;
    tags?: string[];
    businessHours?: BusinessHoursDto;
    totalBookings?: number;
    totalRevenue?: number;
}
