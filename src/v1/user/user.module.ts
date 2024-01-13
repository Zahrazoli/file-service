import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../models/user.model';
import { ServicePlansDefinition } from '../../models/servicePlans.model';
import { UsersPlanDefinition } from '../../models/usersPlan.model';
import { FileServiceModule } from '../file-service/file-service.module';

@Module({
  imports: [
    FileServiceModule,
    MongooseModule.forFeature([
      UserModelDefinition,
      ServicePlansDefinition,
      UsersPlanDefinition,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
