import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Client } from 'src/client/schemas/client.schema';
import { Haircut } from 'src/haircut/schemas/haircut.schema';

export type VisitDocument = HydratedDocument<Visit>;

@Schema()
export class Visit {
  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  client: Client;

  @Prop({ type: Types.ObjectId, ref: 'Haircut', required: true })
  haircut: Haircut;

  @Prop({ required: true })
  finalPrice: number;

  @Prop({ required: true, default: Date.now })
  date: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
