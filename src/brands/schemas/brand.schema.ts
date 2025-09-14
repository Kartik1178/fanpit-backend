import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  logo?: string; // URL of the brand logo

  @Prop({ type: [String], default: [] })
  images: string[]; // URLs of brand images

  @Prop({ 
    type: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      website: { type: String, required: false },
      address: {
        type: {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          country: { type: String, required: true },
          postalCode: { type: String, required: false }
        },
        required: true
      }
    },
    required: true 
  })
  contact: {
    email: string;
    phone: string;
    website?: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode?: string;
    };
  };

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId; // Reference to the brand owner user

  @Prop({ type: [String], default: [] })
  categories: string[]; // e.g., ["coworking", "cafe", "restaurant"]

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Boolean, default: false })
  verified: boolean; // Brand verification status

  @Prop({ type: Number, default: 0 })
  rating: number; // Average rating across all spaces

  @Prop({ type: Number, default: 0 })
  totalSpaces: number; // Total number of spaces

  @Prop({ 
    type: {
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      twitter: { type: String, required: false },
      linkedin: { type: String, required: false }
    },
    default: {}
  })
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };

  @Prop({ type: String, default: 'active' })
  status: string; // active, suspended, pending

  @Prop({ type: [String], default: [] })
  tags: string[]; // e.g., ["premium", "startup-friendly", "eco-friendly"]

  @Prop({ 
    type: {
      monday: { type: String, required: false },
      tuesday: { type: String, required: false },
      wednesday: { type: String, required: false },
      thursday: { type: String, required: false },
      friday: { type: String, required: false },
      saturday: { type: String, required: false },
      sunday: { type: String, required: false }
    },
    required: false
  })
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  @Prop({ type: Number, default: 0 })
  totalBookings: number; // Total bookings across all spaces

  @Prop({ type: Number, default: 0 })
  totalRevenue: number; // Total revenue generated
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
