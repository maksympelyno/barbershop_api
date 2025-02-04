import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Branch } from 'src/branch/schemas/branch.schema';
import { HistoryDocument } from 'src/haircut/schemas/price-history.schema';

export type HaircutDocument = HydratedDocument<Haircut>;

@Schema()
export class Haircut {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branch: Branch;
}

export const HaircutSchema = SchemaFactory.createForClass(Haircut);

HaircutSchema.post<HaircutDocument>('save', async function (doc, next) {
  try {
    const HistoryModel = doc.model('History') as Model<HistoryDocument>;
    const historyEntry = new HistoryModel({
      haircut: doc._id,
      oldPrice: doc.price,
      newPrice: doc.price,
    });
    await historyEntry.save();
  } catch (err) {
    console.error('Error saving history:', err);
  }
  next();
});

HaircutSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update = this.getUpdate() as Partial<HaircutDocument> | undefined;
    if (!update || update.price === undefined) return next();

    const doc: HaircutDocument | null = await this.model.findOne(
      this.getQuery(),
    );
    if (!doc) return next();

    if (doc.price !== update.price) {
      const HistoryModel = doc.model('History') as Model<HistoryDocument>;
      const historyEntry = new HistoryModel({
        haircut: doc._id,
        oldPrice: doc.price,
        newPrice: update.price,
      });
      await historyEntry.save();
    }
  } catch (err) {
    console.error('Error saving history:', err);
  }
  next();
});
