import { Module } from '@nestjs/common';
import { FileServiceModule } from './file-service/file-service.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OthersModule } from './others/others.module';
import { PaymentModule } from './payment/payment.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    FileServiceModule,
    UserModule,
    DashboardModule,
    OthersModule,
    PaymentModule,
    PlansModule,
  ],
})
export class V1Module {}
