import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { VisitModule } from 'src/visit/visit.module';
import { ClientModule } from 'src/client/client.module';
import { HaircutModule } from 'src/haircut/haircut.module';

@Module({
  imports: [HaircutModule, VisitModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
