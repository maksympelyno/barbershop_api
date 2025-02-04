import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BranchDocument = HydratedDocument<Branch>;

@Schema()
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
