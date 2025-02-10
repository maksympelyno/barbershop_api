import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PopularHaircut } from './types/statistics.interface';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/common/enums/role.enum';

@Controller('statistics')
@Roles(UserRole.Admin)
@UseGuards(RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get(':branchId/revenue')
  @ApiOperation({ summary: 'Get total revenue for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: String,
  })
  async getTotalRevenue(
    @Param('branchId') branchId: string,
  ): Promise<{ revenue: number }> {
    const revenue = await this.statisticsService.getTotalRevenue(branchId);
    return { revenue };
  }

  @Get(':branchId/clients')
  @ApiOperation({ summary: 'Get total clients for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The Id of the branch',
    type: String,
  })
  getTotalClients(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getTotalClients(branchId);
  }

  @Get(':branchId/visits')
  @ApiOperation({ summary: 'Get total visits for a branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: String,
  })
  getTotalVisits(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getTotalVisits(branchId);
  }

  @Get(':branchId/popular-haircut')
  @ApiOperation({ summary: 'Get the most popular haircut in the branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: String,
  })
  getMostPopularHaircut(
    @Param('branchId') branchId: string,
  ): Promise<PopularHaircut | null> {
    return this.statisticsService.getMostPopularHaircut(branchId);
  }

  @Get(':branchId/average-price')
  @ApiOperation({ summary: 'Get the average price of haircuts in the branch' })
  @ApiParam({
    name: 'branchId',
    description: 'The ID of the branch',
    type: String,
  })
  getAveragePrice(@Param('branchId') branchId: string): Promise<number> {
    return this.statisticsService.getAveragePrice(branchId);
  }
}
