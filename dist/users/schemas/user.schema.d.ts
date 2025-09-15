import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    CONSUMER = "consumer",
    BRAND_OWNER = "brandOwner",
    STAFF = "staff",
    ADMIN = "admin"
}
export declare enum StaffPermission {
    MANAGE_BOOKINGS = "manage_bookings",
    CHECK_IN_OUT = "check_in_out",
    UPDATE_ATTENDANCE = "update_attendance",
    GRANT_BONUS_POINTS = "grant_bonus_points",
    VIEW_ANALYTICS = "view_analytics",
    MANAGE_SPACES = "manage_spaces"
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
    staffAssignments: Array<{
        brand: Types.ObjectId;
        permissions: StaffPermission[];
        assignedAt: Date;
        assignedBy: Types.ObjectId;
        isActive: boolean;
    }>;
    ownedBrands: Types.ObjectId[];
    adminPermissions: {
        canManageUsers: boolean;
        canManageBrands: boolean;
        canViewGlobalAnalytics: boolean;
        canResolveDisputes: boolean;
        canManagePlatformSettings: boolean;
    };
    bannedAt?: Date;
    banReason?: string;
    bannedBy?: Types.ObjectId;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
