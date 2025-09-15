import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyProgram, LoyaltyProgramSchema } from './schemas/loyalty-program.schema';
import { LoyaltyMember, LoyaltyMemberSchema } from './schemas/loyalty-member.schema';
import { LoyaltyReward, LoyaltyRewardSchema } from './schemas/loyalty-reward.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LoyaltyProgram.name, schema: LoyaltyProgramSchema },
      { name: LoyaltyMember.name, schema: LoyaltyMemberSchema },
      { name: LoyaltyReward.name, schema: LoyaltyRewardSchema },
    ]),
    AuthModule,
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService],
  exports: [LoyaltyService],
})
export class LoyaltyModule {}

