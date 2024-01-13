import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum StatusTypes {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Expired = 'EXPIRED',
}
@Schema({ collection: 'user-plans', timestamps: true })
export class UsersPlanModel {
  @Prop({ type: Types.ObjectId, required: true, ref: 'UsersPlanModel' })
  userId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'ServicePlansModel' })
  planId: string;

  @Prop({
    type: String,
    enum: Object.values(StatusTypes),
    default: StatusTypes.Active,
  })
  status: StatusTypes;
  @Prop({ type: Date, required: true })
  expiredAt: Date;

  createdAt!: Date;

  updatedAt!: Date;
}

export const UsersPlanSchema = SchemaFactory.createForClass(UsersPlanModel);
export type UsersPlanDocument = PaginateModel<UsersPlanModel>;

UsersPlanSchema.plugin(mongoosePaginate);
export const UsersPlanDefinition: ModelDefinition = {
  name: UsersPlanModel.name,
  schema: UsersPlanSchema,
};
