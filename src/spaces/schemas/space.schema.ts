import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SpaceDocument = Space & Document;

@Schema({ timestamps: true })
export class Space {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[]; // URLs of images

  @Prop({ 
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: false },
      lat: { type: Number, required: false },
      lng: { type: Number, required: false }
    },
    required: true 
  })
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
  };

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId; // Reference to the Brand

  @Prop({ type: [String], default: [] })
  amenities: string[]; // e.g., WiFi, AC, Projector

  @Prop({ required: true, default: 0 })
  capacity: number; // Max people allowed

  @Prop({ required: true })
  pricePerHour: number;

  @Prop({ 
    type: {
      open: { type: String, required: true },
      close: { type: String, required: true }
    },
    required: true,
    default: { open: "09:00", close: "18:00" }
  })
  operatingHours: {
    open: string; // e.g., "09:00"
    close: string; // e.g., "18:00"
  };

  @Prop({ type: Map, of: Number })
  peakPricing?: Map<string, number>; 
  // e.g., {"morning": 200, "evening": 250}, optional

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  tags?: string[]; // e.g., coworking, cafe, casual

  @Prop({ type: String, default: 'general' })
  category?: string; // optional, like "coworking" or "cafe"
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
