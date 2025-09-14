import { Document } from 'mongoose';
export type OtpDocument = Otp & Document;
export declare class Otp {
    email?: string;
    phone?: string;
    otp: string;
    type: 'email' | 'sms';
    expiresAt: Date;
    isVerified: boolean;
    attempts: number;
    verifiedAt?: Date;
}
export declare const OtpSchema: import("mongoose").Schema<Otp, import("mongoose").Model<Otp, any, any, any, Document<unknown, any, Otp, any, {}> & Otp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Otp, Document<unknown, {}, import("mongoose").FlatRecord<Otp>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Otp> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
