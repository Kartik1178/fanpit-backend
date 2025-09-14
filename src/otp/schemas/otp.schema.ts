import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ 
    type: String, 
    enum: ['email', 'sms'], 
    required: true 
  })
  type: 'email' | 'sms';

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 0 })
  attempts: number; // Track failed verification attempts

  @Prop()
  verifiedAt?: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

// Index for cleanup
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

