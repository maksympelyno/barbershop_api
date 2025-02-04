import { Body, Controller, Post } from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './schemas/visit.schema';

@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  async createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.createVisit(createVisitDto);
  }
}
