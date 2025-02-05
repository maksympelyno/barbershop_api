import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { VisitModule } from 'src/visit/visit.module';
import { HaircutModule } from 'src/haircut/haircut.module';

@Module({
  imports: [VisitModule, HaircutModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
