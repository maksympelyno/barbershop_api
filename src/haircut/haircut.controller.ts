import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HaircutService } from './haircut.service';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';
import { Haircut } from './schemas/haircut.schema';
import { History } from './schemas/price-history.schema';
import { HistoryChange } from './types/history-change.interface';

@Controller('haircut')
export class HaircutController {
  constructor(private readonly haircutService: HaircutService) {}

  @Post()
  async create(@Body() createHaircutDto: CreateHaircutDto): Promise<Haircut> {
    return this.haircutService.createHaircut(createHaircutDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHaircutDto: UpdateHaircutDto,
  ): Promise<Haircut> {
    return this.haircutService.updateHaircut(id, updateHaircutDto);
  }

  @Get()
  async getAllHaircuts(): Promise<Haircut[]> {
    return this.haircutService.getAllHaircuts();
  }

  @Get('branch/:branchId')
  async getHaircutsByBranch(
    @Param('branchId') branchId: string,
    @Query('name') name?: string,
  ): Promise<Haircut[]> {
    return this.haircutService.getHaircutsByBranch(branchId, name);
  }

  @Get('price-history/:id')
  async getPriceHistory(@Param('id') id: string): Promise<HistoryChange[]> {
    return this.haircutService.getPriceHistory(id);
  }

  @Get(':id')
  async getHaircutById(@Param('id') id: string): Promise<Haircut> {
    return this.haircutService.getHaircutById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.haircutService.deleteHaircut(id);
  }
}
