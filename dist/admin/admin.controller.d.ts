import { AdminService } from './admin.service';
import { BanUserDto } from './dto/ban-user.dto';
import { VerifyBrandDto } from './dto/verify-brand.dto';
import { UserRole } from '../users/schemas/user.schema';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(page?: number, limit?: number, role?: UserRole): Promise<any>;
    banUser(userId: string, banDto: BanUserDto, req: any): Promise<any>;
    unbanUser(userId: string, req: any): Promise<any>;
    getAllBrands(page?: number, limit?: number, status?: string): Promise<any>;
    verifyBrand(brandId: string, verifyDto: VerifyBrandDto, req: any): Promise<any>;
    getGlobalAnalytics(): Promise<any>;
    resolveBookingDispute(bookingId: string, resolution: string, req: any): Promise<any>;
}
