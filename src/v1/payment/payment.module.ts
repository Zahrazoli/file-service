import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDefinition } from '../../models/order.model';
import { ServicePlansDefinition } from '../../models/servicePlans.model';
import { UsersPlanDefinition } from '../../models/usersPlan.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      OrderDefinition,
      ServicePlansDefinition,
      UsersPlanDefinition,
    ]),
    HttpModule.register({ baseURL: 'https://gateway.zibal.ir/v1' }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
