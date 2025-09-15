import { Model } from 'mongoose';
import { UserDocument, UserRole } from '../users/schemas/user.schema';
import { BrandDocument } from '../brands/schemas/brand.schema';
import { BookingDocument } from '../bookings/schemas/booking.schema';
import { BanUserDto } from './dto/ban-user.dto';
import { VerifyBrandDto } from './dto/verify-brand.dto';
export declare class AdminService {
    private userModel;
    private brandModel;
    private bookingModel;
    constructor(userModel: Model<UserDocument>, brandModel: Model<BrandDocument>, bookingModel: Model<BookingDocument>);
    getAllUsers(page?: number, limit?: number, role?: UserRole): Promise<any>;
    banUser(userId: string, banDto: BanUserDto, bannedBy: string): Promise<any>;
    unbanUser(userId: string, unbannedBy: string): Promise<any>;
    getAllBrands(page?: number, limit?: number, status?: string): Promise<any>;
    verifyBrand(brandId: string, verifyDto: VerifyBrandDto, verifiedBy: string): Promise<any>;
    getGlobalAnalytics(): Promise<any>;
    resolveBookingDispute(bookingId: string, resolution: string, resolvedBy: string): Promise<any>;
}
