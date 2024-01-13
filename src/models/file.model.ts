import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum StatusTypes {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Expired = 'EXPIRED',
  InProgress = 'IN_PROGRESS',
}
@Schema({ collection: 'files', timestamps: true })
export class FileModel {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'UserModel' })
  userId: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop({ type: Number, default: 0 })
  downloadCount: number;

  @Prop({
    type: String,
    enum: Object.values(StatusTypes),
    default: StatusTypes.Active,
  })
  status: StatusTypes;

  @Prop(String)
  mimeType: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileModel);
export type FileDocument = PaginateModel<FileModel>;

FileSchema.plugin(mongoosePaginate);
export const FileModelDefinition: ModelDefinition = {
  name: FileModel.name,
  schema: FileSchema,
};
