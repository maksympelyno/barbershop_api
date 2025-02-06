import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './schemas/visit.schema';
import { VisitInfo } from './types/visit-info.interface';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new visit' })
  @ApiResponse({
    status: 201,
    description: 'The visit has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.createVisit(createVisitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all visits' })
  @ApiResponse({ status: 200, description: 'Return all visits.' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication',
    required: true,
    example: 'Bearer your-jwt-token',
  })
  async getAllVisits(): Promise<VisitInfo[]> {
    return this.visitService.getAllVisits();
  }

  @Get('branch/:branchId')
  @ApiOperation({ summary: 'Get visits by branch ID' })
  @ApiParam({ name: 'branchId', description: 'The ID of the branch' })
  @ApiResponse({ status: 200, description: 'Return visits by the branch ID.' })
  @ApiResponse({ status: 404, description: 'Branch not found.' })
  async getVisitsByBranchId(
    @Param('branchId') branchId: string,
  ): Promise<VisitInfo[]> {
    return this.visitService.getVisitsByBranchId(branchId);
  }
}
