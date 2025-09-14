import { Document, Types } from 'mongoose';
export type SpaceDocument = Space & Document;
export declare class Space {
    name: string;
    description: string;
    images: string[];
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode?: string;
        lat?: number;
        lng?: number;
    };
    brand: Types.ObjectId;
    amenities: string[];
    capacity: number;
    pricePerHour: number;
    operatingHours: {
        open: string;
        close: string;
    };
    peakPricing?: Map<string, number>;
    isActive: boolean;
    tags?: string[];
    category?: string;
}
export declare const SpaceSchema: import("mongoose").Schema<Space, import("mongoose").Model<Space, any, any, any, Document<unknown, any, Space, any, {}> & Space & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Space, Document<unknown, {}, import("mongoose").FlatRecord<Space>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Space> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
