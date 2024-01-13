import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum OrderStatusTypes {
  InProgress = 'IN_PROGRESS',
  Confirm = 'CONFIRM',
  Failed = 'FAILED',
}
@Schema({ collection: 'orders', timestamps: true })
export class OrderModel {
  @Prop({ type: Types.ObjectId, required: true, ref: 'UserModel' })
  userId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'ServicePlansModel' })
  planId: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: String })
  RRN: string;

  @Prop({ type: String })
  bankToken: string;

  @Prop({
    type: String,
    enum: Object.values(OrderStatusTypes),
    default: OrderStatusTypes.InProgress,
  })
  status: OrderStatusTypes;

  createdAt!: Date;

  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
export type OrderDocument = PaginateModel<OrderModel>;

OrderSchema.plugin(mongoosePaginate);
export const OrderDefinition: ModelDefinition = {
  name: OrderModel.name,
  schema: OrderSchema,
};
