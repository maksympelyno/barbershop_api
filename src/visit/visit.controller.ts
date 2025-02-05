import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './schemas/visit.schema';
import { VisitInfo } from './types/visit-info.interface';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.createVisit(createVisitDto);
  }

  @Get()
  async getAllVisits(): Promise<VisitInfo[]> {
    return this.visitService.getAllVisits();
  }

  @Get('branch/:branchId')
  async getVisitsByBranchId(
    @Param('branchId') branchId: string,
  ): Promise<VisitInfo[]> {
    return this.visitService.getVisitsByBranchId(branchId);
  }
}
