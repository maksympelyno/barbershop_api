import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { HaircutService } from './haircut.service';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';
import { Haircut } from './schemas/haircut.schema';

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
}
