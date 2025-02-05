import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PopularHaircut } from './types/statistics.interface';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get(':branchId/revenue')
  async getTotalRevenue(@Param('branchId') branchId: string): Promise<{
    revenue: number;
  }> {
    const revenue = await this.statisticsService.getTotalRevenue(branchId);
    return { revenue };
  }

  @Get(':branchId/clients')
  getTotalClients(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getTotalClients(branchId);
  }

  @Get(':branchId/visits')
  getTotalVisits(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getTotalVisits(branchId);
  }

  @Get(':branchId/popular-haircut')
  getMostPopularHaircut(
    @Param('branchId') branchId: string,
  ): Promise<PopularHaircut | null> {
    return this.statisticsService.getMostPopularHaircut(branchId);
  }

  @Get(':branchId/average-price')
  getAveragePrice(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getAveragePrice(branchId);
  }
}
