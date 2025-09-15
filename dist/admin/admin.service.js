"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const brand_schema_1 = require("../brands/schemas/brand.schema");
const booking_schema_1 = require("../bookings/schemas/booking.schema");
let AdminService = class AdminService {
    constructor(userModel, brandModel, bookingModel) {
        this.userModel = userModel;
        this.brandModel = brandModel;
        this.bookingModel = bookingModel;
    }
    async getAllUsers(page = 1, limit = 20, role) {
        const filter = role ? { role } : {};
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.userModel.find(filter)
                .select('-password')
                .populate('ownedBrands', 'name logo')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.userModel.countDocuments(filter)
        ]);
        return {
            users: users.map(user => ({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isActive: user.isActive,
                isEmailVerified: user.isEmailVerified,
                isPhoneVerified: user.isPhoneVerified,
                ownedBrands: user.ownedBrands,
                staffAssignments: user.staffAssignments?.length || 0,
                lastLoginAt: user.lastLoginAt,
                createdAt: user.createdAt,
                bannedAt: user.bannedAt,
                banReason: user.banReason
            })),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async banUser(userId, banDto, bannedBy) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === user_schema_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Cannot ban admin users');
        }
        await this.userModel.findByIdAndUpdate(userId, {
            isActive: false,
            bannedAt: new Date(),
            banReason: banDto.reason,
            bannedBy: new mongoose_2.Types.ObjectId(bannedBy)
        });
        return {
            message: 'User banned successfully',
            userId,
            reason: banDto.reason,
            bannedAt: new Date()
        };
    }
    async unbanUser(userId, unbannedBy) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.userModel.findByIdAndUpdate(userId, {
            isActive: true,
            $unset: { bannedAt: 1, banReason: 1, bannedBy: 1 }
        });
        return {
            message: 'User unbanned successfully',
            userId,
            unbannedAt: new Date()
        };
    }
    async getAllBrands(page = 1, limit = 20, status) {
        const filter = status ? { status } : {};
        const skip = (page - 1) * limit;
        const [brands, total] = await Promise.all([
            this.brandModel.find(filter)
                .populate('owner', 'firstName lastName email')
                .populate('staffMembers.user', 'firstName lastName email')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.brandModel.countDocuments(filter)
        ]);
        return {
            brands: brands.map(brand => ({
                id: brand._id,
                name: brand.name,
                description: brand.description,
                logo: brand.logo,
                owner: brand.owner,
                status: brand.status,
                verified: brand.verified,
                verifiedAt: brand.verifiedAt,
                verifiedBy: brand.verifiedBy,
                totalSpaces: brand.totalSpaces,
                totalBookings: brand.totalBookings,
                totalRevenue: brand.totalRevenue,
                staffCount: brand.staffMembers?.filter(member => member.isActive).length || 0,
                createdAt: brand.createdAt
            })),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async verifyBrand(brandId, verifyDto, verifiedBy) {
        const brand = await this.brandModel.findById(brandId);
        if (!brand) {
            throw new common_1.NotFoundException('Brand not found');
        }
        await this.brandModel.findByIdAndUpdate(brandId, {
            verified: verifyDto.verified,
            verifiedAt: new Date(),
            verifiedBy: new mongoose_2.Types.ObjectId(verifiedBy),
            verificationNotes: verifyDto.notes,
            status: verifyDto.verified ? 'active' : 'suspended'
        });
        return {
            message: `Brand ${verifyDto.verified ? 'verified' : 'rejected'} successfully`,
            brandId,
            verified: verifyDto.verified,
            verifiedAt: new Date(),
            notes: verifyDto.notes
        };
    }
    async getGlobalAnalytics() {
        const [totalUsers, totalBrands, totalBookings, totalRevenue, usersByRole, brandsByStatus, recentBookings, topBrands] = await Promise.all([
            this.userModel.countDocuments(),
            this.brandModel.countDocuments(),
            this.bookingModel.countDocuments(),
            this.bookingModel.aggregate([
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            this.userModel.aggregate([
                { $group: { _id: '$role', count: { $sum: 1 } } }
            ]),
            this.brandModel.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            this.bookingModel.find()
                .populate('user', 'firstName lastName email')
                .populate('space', 'name')
                .populate('brand', 'name')
                .sort({ createdAt: -1 })
                .limit(10),
            this.brandModel.find()
                .sort({ totalRevenue: -1 })
                .limit(10)
                .select('name logo totalRevenue totalBookings')
        ]);
        return {
            overview: {
                totalUsers,
                totalBrands,
                totalBookings,
                totalRevenue: totalRevenue[0]?.total || 0
            },
            usersByRole: usersByRole.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            brandsByStatus: brandsByStatus.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            recentBookings: recentBookings.map(booking => ({
                id: booking._id,
                user: booking.user,
                space: booking.space,
                brand: booking.brand,
                totalAmount: booking.totalAmount,
                status: booking.status,
                createdAt: booking.createdAt
            })),
            topBrands: topBrands.map(brand => ({
                id: brand._id,
                name: brand.name,
                logo: brand.logo,
                totalRevenue: brand.totalRevenue,
                totalBookings: brand.totalBookings
            }))
        };
    }
    async resolveBookingDispute(bookingId, resolution, resolvedBy) {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        await this.bookingModel.findByIdAndUpdate(bookingId, {
            status: 'resolved',
            adminNotes: resolution,
            resolvedBy: new mongoose_2.Types.ObjectId(resolvedBy),
            resolvedAt: new Date()
        });
        return {
            message: 'Booking dispute resolved successfully',
            bookingId,
            resolution,
            resolvedAt: new Date()
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map