import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusTypes } from './file.model';

@Schema({ collection: 'users', timestamps: true })
export class UserModel {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String })
  firstName: string;
  @Prop({ type: String })
  lastName: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: String })
  username: string;
  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;
  @Prop({ type: [String], default: [] })
  scope: Array<string>;
  @Prop({
    type: String,
    enum: Object.values(StatusTypes),
    default: StatusTypes.Active,
  })
  status: StatusTypes;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type UserDocument = HydratedDocument<UserModel>;
export const UserModelDefinition: ModelDefinition = {
  name: UserModel.name,
  schema: UserSchema,
};
