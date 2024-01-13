import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../models/user.model';
import { FileServiceModule } from '../file-service/file-service.module';

@Module({
  imports: [
    FileServiceModule,
    MongooseModule.forFeature([UserModelDefinition]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
