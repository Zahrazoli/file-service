import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../models/user.model';
import { UsersPlanDefinition } from '../../models/usersPlan.model';
import { ServicePlansDefinition } from '../../models/servicePlans.model';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    MongooseModule.forFeature([
      UserModelDefinition,
      UsersPlanDefinition,
      ServicePlansDefinition,
    ]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
