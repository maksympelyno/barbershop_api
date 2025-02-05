import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get(':branchId/revenue')
  async getTotalRevenue(@Param('branchId') branchId: string) {
    const revenue = await this.statisticsService.getTotalRevenue(branchId);
    return { revenue };
  }

  @Get(':branchId/clients')
  getTotalClients(@Param('branchId') branchId: string) {
    return this.statisticsService.getTotalClients(branchId);
  }

  @Get(':branchId/visits')
  getTotalVisits(@Param('branchId') branchId: string) {
    return this.statisticsService.getTotalVisits(branchId);
  }

  @Get(':branchId/popular-haircut')
  getMostPopularHaircut(@Param('branchId') branchId: string) {
    return this.statisticsService.getMostPopularHaircut(branchId);
  }

  @Get(':branchId/average-price')
  getAveragePrice(@Param('branchId') branchId: string) {
    return this.statisticsService.getAveragePrice(branchId);
  }
}
