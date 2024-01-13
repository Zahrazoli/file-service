import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum StatusTypes {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
}

export enum ServicesTypes {
  Starter = 'STARTER',
  Free = 'FREE',
  Saleable = 'SALEABLE',
}
@Schema({ collection: 'service-plans', timestamps: true })
export class ServicePlansModel {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({ type: Number, required: true })
  size: string;

  @Prop({ type: Number, required: true })
  duration: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, enum: Object.values(ServicesTypes), required: true })
  type: ServicesTypes;

  @Prop({
    type: String,
    enum: Object.values(StatusTypes),
    default: StatusTypes.Active,
  })
  status: StatusTypes;

  createdAt!: Date;

  updatedAt!: Date;
}

export const ServicePlansSchema =
  SchemaFactory.createForClass(ServicePlansModel);
export type ServicePlansDocument = HydratedDocument<ServicePlansModel>;

ServicePlansSchema.plugin(mongoosePaginate);
export const ServicePlansDefinition: ModelDefinition = {
  name: ServicePlansModel.name,
  schema: ServicePlansSchema,
};
