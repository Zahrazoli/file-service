import { Test, TestingModule } from '@nestjs/testing';
import { FileServiceController } from './file-service.controller';

describe('FileServiceController', () => {
  let controller: FileServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileServiceController],
    }).compile();

    controller = module.get<FileServiceController>(FileServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
