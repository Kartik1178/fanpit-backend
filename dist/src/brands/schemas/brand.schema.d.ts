import { Document, Types } from 'mongoose';
export type BrandDocument = Brand & Document;
export declare class Brand {
    name: string;
    description: string;
    logo?: string;
    images: string[];
    contact: {
        email: string;
        phone: string;
        website?: string;
        address: {
            street: string;
            city: string;
            state: string;
            country: string;
            postalCode?: string;
        };
    };
    owner: Types.ObjectId;
    categories: string[];
    isActive: boolean;
    verified: boolean;
    rating: number;
    totalSpaces: number;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        linkedin?: string;
    };
    status: string;
    tags: string[];
    businessHours?: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    totalBookings: number;
    totalRevenue: number;
}
export declare const BrandSchema: import("mongoose").Schema<Brand, import("mongoose").Model<Brand, any, any, any, Document<unknown, any, Brand, any, {}> & Brand & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, Document<unknown, {}, import("mongoose").FlatRecord<Brand>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Brand> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
