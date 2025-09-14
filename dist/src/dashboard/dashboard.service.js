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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const space_schema_1 = require("../spaces/schemas/space.schema");
const booking_schema_1 = require("../bookings/schemas/booking.schema");
const brand_schema_1 = require("../brands/schemas/brand.schema");
let DashboardService = class DashboardService {
    constructor(userModel, spaceModel, bookingModel, brandModel) {
        this.userModel = userModel;
        this.spaceModel = spaceModel;
        this.bookingModel = bookingModel;
        this.brandModel = brandModel;
    }
    async getStaffDashboard(userId) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== user_schema_1.UserRole.STAFF) {
            throw new Error('User not found or not a staff member');
        }
        const mockBrandId = '507f1f77bcf86cd799439011';
        const brand = await this.brandModel.findById(mockBrandId);
        if (!brand) {
            throw new Error('No brand assigned to staff member');
        }
        const spaces = await this.spaceModel.find({ brand: mockBrandId });
        const today = new Date().toISOString().split('T')[0];
        const todayBookings = await this.bookingModel
            .find({
            space: { $in: spaces.map(s => s._id.toString()) },
            date: today,
            status: { $in: ['confirmed', 'pending'] }
        })
            .populate('user', 'firstName lastName email')
            .populate('space', 'name location')
            .sort({ startTime: 1 });
        const pendingTasks = await this.getStaffTasks(userId, spaces.map(s => s._id.toString()));
        const notifications = await this.getStaffNotifications(userId);
        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                brandId: mockBrandId
            },
            brand: {
                _id: brand._id,
                name: brand.name,
                logo: brand.logo
            },
            spaces: spaces.map(space => ({
                _id: space._id,
                name: space.name,
                location: space.location
            })),
            todayBookings,
            pendingTasks,
            notifications,
            stats: {
                totalBookingsToday: todayBookings.length,
                pendingTasks: pendingTasks.length,
                unreadNotifications: notifications.filter(n => !n.read).length
            }
        };
    }
    async getBrandOwnerDashboard(userId) {
        const user = await this.userModel.findById(userId);
        if (!user || user.role !== user_schema_1.UserRole.BRAND_OWNER) {
            throw new Error('User not found or not a brand owner');
        }
        const brand = await this.brandModel.findOne({ owner: userId });
        if (!brand) {
            throw new Error('No brand found for this user');
        }
        const spaces = await this.spaceModel.find({ brand: brand._id });
        const staff = await this.userModel.find({
            role: user_schema_1.UserRole.STAFF
        }).select('firstName lastName email role createdAt').limit(5);
        const recentBookings = await this.bookingModel
            .find({ space: { $in: spaces.map(s => s._id.toString()) } })
            .populate('user', 'firstName lastName email')
            .populate('space', 'name')
            .sort({ createdAt: -1 })
            .limit(10);
        const analytics = await this.getBrandAnalytics(brand._id.toString(), spaces.map(s => s._id.toString()));
        return {
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            brand: {
                _id: brand._id,
                name: brand.name,
                description: brand.description,
                logo: brand.logo,
                website: brand.contact.website
            },
            spaces: spaces.map(space => ({
                _id: space._id,
                name: space.name,
                location: space.location,
                pricePerHour: space.pricePerHour,
                isActive: space.isActive
            })),
            staff,
            recentBookings,
            analytics
        };
    }
    async getAdminDashboard() {
        const brands = await this.brandModel.find().populate('owner', 'firstName lastName email');
        const users = await this.userModel.find().select('firstName lastName email role createdAt isEmailVerified');
        const spaces = await this.spaceModel.find().populate('brand', 'name');
        const bookings = await this.bookingModel.find()
            .populate('user', 'firstName lastName email')
            .populate('space', 'name')
            .sort({ createdAt: -1 })
            .limit(20);
        const analytics = await this.getGlobalAnalytics();
        return {
            brands: brands.map(brand => ({
                _id: brand._id,
                name: brand.name,
                description: brand.description,
                owner: brand.owner,
                spacesCount: spaces.filter(s => s.brand.toString() === brand._id.toString()).length,
                createdAt: brand.createdAt
            })),
            users: users.map(user => ({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt
            })),
            spaces: spaces.map(space => ({
                _id: space._id,
                name: space.name,
                brand: space.brand,
                location: space.location,
                pricePerHour: space.pricePerHour,
                isActive: space.isActive
            })),
            recentBookings: bookings,
            analytics
        };
    }
    async getStaffTasks(userId, spaceIds) {
        return [
            {
                _id: '1',
                type: 'check_in',
                title: 'Check-in customer for T-Hub Chennai',
                description: 'Customer John Doe arriving at 10:00 AM',
                spaceId: spaceIds[0],
                dueTime: '10:00',
                status: 'pending',
                priority: 'high'
            },
            {
                _id: '2',
                type: 'cleaning',
                title: 'Clean CoWrks Anna Salai',
                description: 'Post-event cleanup required',
                spaceId: spaceIds[1] || spaceIds[0],
                dueTime: '18:00',
                status: 'pending',
                priority: 'medium'
            }
        ];
    }
    async getStaffNotifications(userId) {
        return [
            {
                _id: '1',
                type: 'booking',
                title: 'New booking received',
                message: 'Customer booked T-Hub Chennai for tomorrow',
                read: false,
                createdAt: new Date()
            },
            {
                _id: '2',
                type: 'reminder',
                title: 'Check-in reminder',
                message: 'Customer arriving in 30 minutes',
                read: false,
                createdAt: new Date()
            }
        ];
    }
    async getBrandAnalytics(brandId, spaceIds) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const totalBookings = await this.bookingModel.countDocuments({
            space: { $in: spaceIds },
            createdAt: { $gte: thirtyDaysAgo }
        });
        const confirmedBookings = await this.bookingModel.countDocuments({
            space: { $in: spaceIds },
            status: 'confirmed',
            createdAt: { $gte: thirtyDaysAgo }
        });
        const revenue = await this.bookingModel.aggregate([
            {
                $match: {
                    space: { $in: spaceIds },
                    status: 'confirmed',
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);
        return {
            totalBookings,
            confirmedBookings,
            totalRevenue: revenue[0]?.totalRevenue || 0,
            spacesCount: spaceIds.length,
            staffCount: await this.userModel.countDocuments({ role: user_schema_1.UserRole.STAFF })
        };
    }
    async getGlobalAnalytics() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const totalUsers = await this.userModel.countDocuments();
        const totalBrands = await this.brandModel.countDocuments();
        const totalSpaces = await this.spaceModel.countDocuments();
        const totalBookings = await this.bookingModel.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });
        const revenue = await this.bookingModel.aggregate([
            {
                $match: {
                    status: 'confirmed',
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' }
                }
            }
        ]);
        return {
            totalUsers,
            totalBrands,
            totalSpaces,
            totalBookings,
            totalRevenue: revenue[0]?.totalRevenue || 0
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(space_schema_1.Space.name)),
    __param(2, (0, mongoose_1.InjectModel)(booking_schema_1.Booking.name)),
    __param(3, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map