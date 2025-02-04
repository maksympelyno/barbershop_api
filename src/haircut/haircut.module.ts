import { Module } from '@nestjs/common';
import { Haircut, HaircutSchema } from './schemas/haircut.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HaircutService } from './haircut.service';
import { HaircutController } from './haircut.controller';
import { History, HistorySchema } from './schemas/price-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Haircut.name, schema: HaircutSchema },
      { name: History.name, schema: HistorySchema },
    ]),
  ],
  exports: [MongooseModule],
  providers: [HaircutService],
  controllers: [HaircutController],
})
export class HaircutModule {}
