import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Branch } from 'src/branch/schemas/branch.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'manager' })
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'Branch', required: false })
  branch: Branch;
}

export const UserSchema = SchemaFactory.createForClass(User);
