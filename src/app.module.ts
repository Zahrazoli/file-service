import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:94cFaOgeySAiSvm2qRGBMiM8@el-capitan.liara.cloud:30903/file-service?authSource=admin',
    ),
    V1Module,
  ],
})
export class AppModule {}
