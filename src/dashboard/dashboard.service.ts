import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from '../users/schemas/user.schema';
import { Space, SpaceDocument } from '../spaces/schemas/space.schema';
import { Booking, BookingDocument } from '../bookings/schemas/booking.schema';
import { Brand, BrandDocument } from '../brands/schemas/brand.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  // Staff Dashboard Data
  async getStaffDashboard(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== UserRole.STAFF) {
      throw new Error('User not found or not a staff member');
    }

    // For now, we'll use a mock brand since staff don't have brandId in the schema
    // In a real implementation, you'd add brandId to the User schema
    const mockBrandId = '507f1f77bcf86cd799439011'; // Mock brand ID
    const brand = await this.brandModel.findById(mockBrandId);
    if (!brand) {
      throw new Error('No brand assigned to staff member');
    }

    // Get spaces for the brand
    const spaces = await this.spaceModel.find({ brand: mockBrandId });

    // Get today's bookings
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

    // Get pending tasks (check-ins, cleaning, etc.)
    const pendingTasks = await this.getStaffTasks(userId, spaces.map(s => s._id.toString()));

    // Get notifications
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

  // Brand Owner Dashboard Data
  async getBrandOwnerDashboard(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user || user.role !== UserRole.BRAND_OWNER) {
      throw new Error('User not found or not a brand owner');
    }

    // Get user's brand
    const brand = await this.brandModel.findOne({ owner: userId });
    if (!brand) {
      throw new Error('No brand found for this user');
    }

    // Get all spaces for the brand
    const spaces = await this.spaceModel.find({ brand: brand._id });

    // Get staff members (mock for now since staff don't have brandId)
    const staff = await this.userModel.find({ 
      role: UserRole.STAFF 
    }).select('firstName lastName email role createdAt').limit(5);

    // Get recent bookings
    const recentBookings = await this.bookingModel
      .find({ space: { $in: spaces.map(s => s._id.toString()) } })
      .populate('user', 'firstName lastName email')
      .populate('space', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get analytics
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

  // Admin Dashboard Data
  async getAdminDashboard() {
    // Get all brands
    const brands = await this.brandModel.find().populate('owner', 'firstName lastName email');

    // Get all users
    const users = await this.userModel.find().select('firstName lastName email role createdAt isEmailVerified');

    // Get all spaces
    const spaces = await this.spaceModel.find().populate('brand', 'name');

    // Get all bookings
    const bookings = await this.bookingModel.find()
      .populate('user', 'firstName lastName email')
      .populate('space', 'name')
      .sort({ createdAt: -1 })
      .limit(20);

    // Get global analytics
    const analytics = await this.getGlobalAnalytics();

    return {
      brands: brands.map(brand => ({
        _id: brand._id,
        name: brand.name,
        description: brand.description,
        owner: brand.owner,
        spacesCount: spaces.filter(s => s.brand.toString() === brand._id.toString()).length,
        createdAt: (brand as any).createdAt
      })),
      users: users.map(user => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: (user as any).createdAt
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

  // Helper methods
  private async getStaffTasks(userId: string, spaceIds: string[]) {
    // This would be expanded based on your task system
    // For now, returning mock tasks
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

  private async getStaffNotifications(userId: string) {
    // This would be expanded based on your notification system
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

  private async getBrandAnalytics(brandId: string, spaceIds: string[]) {
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
      staffCount: await this.userModel.countDocuments({ role: UserRole.STAFF })
    };
  }

  private async getGlobalAnalytics() {
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
}
