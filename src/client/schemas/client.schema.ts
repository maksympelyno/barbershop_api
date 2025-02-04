import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName?: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @Prop({ default: false })
  isRegular: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
