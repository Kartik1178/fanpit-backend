import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from '../users/schemas/user.schema';
import { SpaceDocument } from '../spaces/schemas/space.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { BrandDocument } from '../brands/schemas/brand.schema';
export declare class DashboardService {
    private userModel;
    private spaceModel;
    private bookingModel;
    private brandModel;
    constructor(userModel: Model<UserDocument>, spaceModel: Model<SpaceDocument>, bookingModel: Model<BookingDocument>, brandModel: Model<BrandDocument>);
    getStaffDashboard(userId: string): Promise<{
        user: {
            _id: unknown;
            firstName: string;
            lastName: string;
            role: UserRole.STAFF;
            brandId: string;
        };
        brand: {
            _id: unknown;
            name: string;
            logo: string;
        };
        spaces: {
            _id: unknown;
            name: string;
            location: {
                address: string;
                city: string;
                state: string;
                country: string;
                postalCode?: string;
                lat?: number;
                lng?: number;
            };
        }[];
        todayBookings: (import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pendingTasks: {
            _id: string;
            type: string;
            title: string;
            description: string;
            spaceId: string;
            dueTime: string;
            status: string;
            priority: string;
        }[];
        notifications: {
            _id: string;
            type: string;
            title: string;
            message: string;
            read: boolean;
            createdAt: Date;
        }[];
        stats: {
            totalBookingsToday: number;
            pendingTasks: number;
            unreadNotifications: number;
        };
    }>;
    getBrandOwnerDashboard(userId: string): Promise<{
        user: {
            _id: unknown;
            firstName: string;
            lastName: string;
            role: UserRole.BRAND_OWNER;
        };
        brand: {
            _id: unknown;
            name: string;
            description: string;
            logo: string;
            website: string;
        };
        spaces: {
            _id: unknown;
            name: string;
            location: {
                address: string;
                city: string;
                state: string;
                country: string;
                postalCode?: string;
                lat?: number;
                lng?: number;
            };
            pricePerHour: number;
            isActive: boolean;
        }[];
        staff: (import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        recentBookings: (import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        analytics: {
            totalBookings: number;
            confirmedBookings: number;
            totalRevenue: any;
            spacesCount: number;
            staffCount: number;
        };
    }>;
    getAdminDashboard(): Promise<{
        brands: {
            _id: unknown;
            name: string;
            description: string;
            owner: import("mongoose").Types.ObjectId;
            spacesCount: number;
            createdAt: any;
        }[];
        users: {
            _id: unknown;
            firstName: string;
            lastName: string;
            email: string;
            role: UserRole;
            isEmailVerified: boolean;
            createdAt: any;
        }[];
        spaces: {
            _id: unknown;
            name: string;
            brand: import("mongoose").Types.ObjectId;
            location: {
                address: string;
                city: string;
                state: string;
                country: string;
                postalCode?: string;
                lat?: number;
                lng?: number;
            };
            pricePerHour: number;
            isActive: boolean;
        }[];
        recentBookings: (import("mongoose").Document<unknown, {}, BookingDocument, {}, {}> & Booking & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        analytics: {
            totalUsers: number;
            totalBrands: number;
            totalSpaces: number;
            totalBookings: number;
            totalRevenue: any;
        };
    }>;
    private getStaffTasks;
    private getStaffNotifications;
    private getBrandAnalytics;
    private getGlobalAnalytics;
}
