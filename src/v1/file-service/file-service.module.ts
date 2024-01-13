import { Module } from '@nestjs/common';
import { FileServiceController } from './file-service.controller';
import { FileServiceService } from './file-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../models/user.model';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UsersPlanDefinition } from '../../models/usersPlan.model';
import { FileModelDefinition } from '../../models/file.model';
import { S3Service } from './s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      UserModelDefinition,
      FileModelDefinition,
      UsersPlanDefinition,
    ]),
    MulterModule.register({ storage: memoryStorage() }),
  ],
  controllers: [FileServiceController],
  providers: [S3Service, FileServiceService],
  exports: [S3Service, FileServiceService],
})
export class FileServiceModule {}
