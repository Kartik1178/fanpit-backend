import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    CONSUMER = "consumer",
    BRAND_OWNER = "brandOwner",
    STAFF = "staff",
    ADMIN = "admin"
}
export declare class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    isActive: boolean;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    profilePicture?: string;
    lastLoginAt?: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
