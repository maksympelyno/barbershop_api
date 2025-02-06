import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type BranchDocument = HydratedDocument<Branch>;

@Schema()
export class Branch {
  @ApiProperty({ example: 'string', description: 'Branch ID' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'string', description: 'Name of the branch' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'string', description: 'Address of the branch' })
  @Prop({ required: true })
  address: string;
}
export const BranchSchema = SchemaFactory.createForClass(Branch);
