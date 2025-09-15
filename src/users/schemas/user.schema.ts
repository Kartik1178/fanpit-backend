import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  CONSUMER = 'consumer',
  BRAND_OWNER = 'brandOwner',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export enum StaffPermission {
  MANAGE_BOOKINGS = 'manage_bookings',
  CHECK_IN_OUT = 'check_in_out',
  UPDATE_ATTENDANCE = 'update_attendance',
  GRANT_BONUS_POINTS = 'grant_bonus_points',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_SPACES = 'manage_spaces',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phone?: string;

  @Prop({ 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.CONSUMER 
  })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isPhoneVerified: boolean;

  @Prop()
  profilePicture?: string;

  @Prop()
  lastLoginAt?: Date;

  // Enhanced RBAC fields
  @Prop({ 
    type: [{
      brand: { type: Types.ObjectId, ref: 'Brand', required: true },
      permissions: [{ 
        type: String, 
        enum: Object.values(StaffPermission),
        default: []
      }],
      assignedAt: { type: Date, default: Date.now },
      assignedBy: { type: Types.ObjectId, ref: 'User', required: true },
      isActive: { type: Boolean, default: true }
    }],
    default: []
  })
  staffAssignments: Array<{
    brand: Types.ObjectId;
    permissions: StaffPermission[];
    assignedAt: Date;
    assignedBy: Types.ObjectId;
    isActive: boolean;
  }>;

  @Prop({ 
    type: [Types.ObjectId], 
    ref: 'Brand', 
    default: [] 
  })
  ownedBrands: Types.ObjectId[];

  @Prop({ 
    type: {
      canManageUsers: { type: Boolean, default: false },
      canManageBrands: { type: Boolean, default: false },
      canViewGlobalAnalytics: { type: Boolean, default: false },
      canResolveDisputes: { type: Boolean, default: false },
      canManagePlatformSettings: { type: Boolean, default: false }
    },
    default: {}
  })
  adminPermissions: {
    canManageUsers: boolean;
    canManageBrands: boolean;
    canViewGlobalAnalytics: boolean;
    canResolveDisputes: boolean;
    canManagePlatformSettings: boolean;
  };

  @Prop({ type: Date })
  bannedAt?: Date;

  @Prop()
  banReason?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  bannedBy?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
