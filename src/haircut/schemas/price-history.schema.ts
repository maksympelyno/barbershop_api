import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Haircut } from 'src/haircut/schemas/haircut.schema';

export type HistoryDocument = HydratedDocument<History> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class History extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Haircut', required: true })
  haircut: Haircut;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  newPrice: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
