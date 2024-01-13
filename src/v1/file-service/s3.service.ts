import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3 = new S3({
    endpoint: `storage.iran.liara.space`,
    region: 'default',
    credentials: {
      secretAccessKey: 'c5107f54-94ae-46ad-aa52-3cc3d2994d87',
      accessKeyId: '033ddgevolakgllu',
    },
  });

  async uploadToS3(data: {
    key: string;
    fileSize: number;
    mimeType: string;
    file: Buffer;
  }) {
    const { key, file, fileSize, mimeType } = data;
    return await this.s3
      .upload({
        Body: file,
        Bucket: 'file-service',
        ContentLength: fileSize,
        Key: key,
        ContentType: mimeType,
      })
      .promise();
  }

  async downloadFromS3(fileToken: string) {
    return this.s3
      .getObject({ Bucket: 'file-service', Key: fileToken })
      .createReadStream();
  }

  async removeFromS3(fileToken: string) {
    return this.s3
      .deleteObject({ Bucket: 'file-service', Key: fileToken })
      .promise();
  }
}
