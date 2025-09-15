import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserRole } from '../users/schemas/user.schema';
import { Brand, BrandDocument } from '../brands/schemas/brand.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { BanUserDto } from './dto/ban-user.dto';
import { VerifyBrandDto } from './dto/verify-brand.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async getAllUsers(page: number = 1, limit: number = 20, role?: UserRole): Promise<any> {
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
        createdAt: (user as any).createdAt,
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

  async banUser(userId: string, banDto: BanUserDto, bannedBy: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot ban admin users');
    }

    await this.userModel.findByIdAndUpdate(userId, {
      isActive: false,
      bannedAt: new Date(),
      banReason: banDto.reason,
      bannedBy: new Types.ObjectId(bannedBy)
    });

    return {
      message: 'User banned successfully',
      userId,
      reason: banDto.reason,
      bannedAt: new Date()
    };
  }

  async unbanUser(userId: string, unbannedBy: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
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

  async getAllBrands(page: number = 1, limit: number = 20, status?: string): Promise<any> {
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
        createdAt: (brand as any).createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async verifyBrand(brandId: string, verifyDto: VerifyBrandDto, verifiedBy: string): Promise<any> {
    const brand = await this.brandModel.findById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    await this.brandModel.findByIdAndUpdate(brandId, {
      verified: verifyDto.verified,
      verifiedAt: new Date(),
      verifiedBy: new Types.ObjectId(verifiedBy),
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

  async getGlobalAnalytics(): Promise<any> {
    const [
      totalUsers,
      totalBrands,
      totalBookings,
      totalRevenue,
      usersByRole,
      brandsByStatus,
      recentBookings,
      topBrands
    ] = await Promise.all([
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
        brand: (booking as any).brand,
        totalAmount: booking.totalAmount,
        status: booking.status,
        createdAt: (booking as any).createdAt
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

  async resolveBookingDispute(bookingId: string, resolution: string, resolvedBy: string): Promise<any> {
    const booking = await this.bookingModel.findById(bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingModel.findByIdAndUpdate(bookingId, {
      status: 'resolved',
      adminNotes: resolution,
      resolvedBy: new Types.ObjectId(resolvedBy),
      resolvedAt: new Date()
    });

    return {
      message: 'Booking dispute resolved successfully',
      bookingId,
      resolution,
      resolvedAt: new Date()
    };
  }
}
