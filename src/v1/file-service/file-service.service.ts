import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { FileModel, StatusTypes } from '../../models/file.model';
import { UsersPlanModel } from '../../models/usersPlan.model';
import { ServicePlansDocument } from '../../models/servicePlans.model';
import { S3Service } from './s3.service';

@Injectable()
export class FileServiceService {
  @InjectModel(FileModel.name)
  private readonly filesRepo: PaginateModel<FileModel>;

  @InjectModel(UsersPlanModel.name)
  private readonly userPlansRepo: PaginateModel<UsersPlanModel>;

  constructor(private readonly S3Service: S3Service) {}
  async getUserFilesList(
    userId: string | Types.ObjectId,
    offset = 0,
    limit = 10,
  ) {
    return this.filesRepo.paginate(
      { userId: new Types.ObjectId(userId), status: StatusTypes.Active },
      { sort: { createdAt: -1 }, offset, limit },
    );
  }

  async getUserFilesCount(userId: string | Types.ObjectId) {
    return this.filesRepo.countDocuments({
      userId: new Types.ObjectId(userId),
      status: StatusTypes.Active,
    });
  }

  async getTotalStorage(userId: string | Types.ObjectId, convertToMB = true) {
    const plans = await this.userPlansRepo.find(
      { userId: new Types.ObjectId(userId), expiredAt: { $gt: new Date() } },
      { planId: 1 },
      { populate: { path: 'planId', select: 'size' } },
    );
    let total = 0;
    plans.forEach(
      (item) =>
        (total += +(item.planId as unknown as ServicePlansDocument).size),
    );
    const megabytes = total / (1024 * 1024);
    return {
      value: convertToMB ? megabytes.toFixed(2) : total,
      unit: convertToMB ? 'MB' : 'Byte',
    };
  }

  async getUsedStorage(userId: string | Types.ObjectId, convertToMB = true) {
    const files = await this.filesRepo.find(
      { userId: new Types.ObjectId(userId), status: StatusTypes.Active },
      { size: 1 },
    );
    let total = 0;
    files.forEach((item) => (total += +item.size));
    const megabytes = total / (1024 * 1024);
    return {
      value: convertToMB ? megabytes.toFixed(2) : total,
      unit: convertToMB ? 'MB' : 'Byte',
    };
  }

  async validateFileSize(userId: string | Types.ObjectId, size: number) {
    const usedStorage = await this.getUsedStorage(userId, false);
    const totalStorage = await this.getTotalStorage(userId, false);
    const freeStorage = +totalStorage.value - +usedStorage.value;
    if (size > freeStorage)
      throw new BadRequestException(
        'فضای کافی برای ذخیره سازی فایل وجود ندارد',
      );
  }

  async upload(details: {
    userId: string | Types.ObjectId;
    buffer: Buffer;
    size: number;
    name: string;
    mimeType: string;
  }) {
    const { size, name, userId, buffer, mimeType } = details;
    const file = await this.filesRepo.create({
      userId: new Types.ObjectId(userId),
      name,
      size,
      status: StatusTypes.InProgress,
      mimeType,
    });
    await this.S3Service.uploadToS3({
      file: buffer,
      fileSize: size,
      mimeType,
      key: `/${file._id}/${name}`,
    });
    file.status = StatusTypes.Active;
    await file.save();
  }

  async dowload(fileToken: string) {
    const file = await this.filesRepo.findOne({
      _id: fileToken,
      status: StatusTypes.Active,
    });
    if (!file) throw new NotFoundException('فایل مورد نظر یافت نشد');
    const stream = await this.S3Service.downloadFromS3(
      `/${fileToken}/${file.name}`,
    );
    stream.on('end', () => {
      file.downloadCount = ++file.downloadCount;
      file.save();
    });
    return { stream, fileInfo: file };
  }

  async delete(fileToken: string, userId: string | Types.ObjectId) {
    const file = await this.filesRepo.findOne({
      userId: new Types.ObjectId(userId),
      _id: new Types.ObjectId(fileToken),
      status: StatusTypes.Active,
    });
    if (!file) throw new NotFoundException();
    await this.S3Service.removeFromS3(`/${fileToken}/${file.name}`);
    file.status = StatusTypes.Deleted;
    await file.save();
  }
}
