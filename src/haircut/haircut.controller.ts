import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HaircutService } from './haircut.service';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';
import { Haircut } from './schemas/haircut.schema';
import { HistoryChange } from './types/history-change.response';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('haircut')
@Roles(UserRole.Manager, UserRole.Admin)
@UseGuards(RolesGuard)
export class HaircutController {
  constructor(private readonly haircutService: HaircutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new haircut' })
  @ApiResponse({
    status: 201,
    description: 'The haircut has been successfully created.',
    type: Haircut,
  })
  create(@Body() createHaircutDto: CreateHaircutDto): Promise<Haircut> {
    return this.haircutService.createHaircut(createHaircutDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing haircut by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Haircut ID' })
  @ApiResponse({
    status: 200,
    description: 'The haircut has been successfully updated.',
    type: Haircut,
  })
  @ApiResponse({
    status: 404,
    description: 'Haircut not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateHaircutDto: UpdateHaircutDto,
  ): Promise<Haircut> {
    return this.haircutService.updateHaircut(id, updateHaircutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all haircuts' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all haircuts.',
    type: [Haircut],
  })
  getAllHaircuts(): Promise<Haircut[]> {
    return this.haircutService.getAllHaircuts();
  }

  @Get('branch/:branchId')
  @ApiOperation({ summary: 'Get haircuts by branch ID' })
  @ApiParam({ name: 'branchId', type: String, description: 'Branch ID' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Search for haircuts by name',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved haircuts by branch.',
    type: [Haircut],
  })
  getHaircutsByBranch(
    @Param('branchId') branchId: string,
    @Query('name') name?: string,
  ): Promise<Haircut[]> {
    return this.haircutService.getHaircutsByBranch(branchId, name);
  }

  @Get('name')
  @ApiOperation({ summary: 'Get haircuts by name' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Search for haircuts by name',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved haircuts by name.',
    type: [Haircut],
  })
  getHaircutsByName(@Query('name') name: string): Promise<Haircut[]> {
    return this.haircutService.getHaircutsByName(name);
  }

  @Get('price-history/:id')
  @ApiOperation({ summary: 'Get price history for a haircut' })
  @ApiParam({ name: 'id', type: String, description: 'Haircut ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved price history for the haircut.',
    type: [HistoryChange],
  })
  getPriceHistory(@Param('id') id: string): Promise<HistoryChange[]> {
    return this.haircutService.getPriceHistory(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a haircut by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Haircut ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the haircut.',
    type: Haircut,
  })
  @ApiResponse({
    status: 404,
    description: 'Haircut not found.',
  })
  getHaircutById(@Param('id') id: string): Promise<Haircut> {
    return this.haircutService.getHaircutById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a haircut by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Haircut ID' })
  @ApiResponse({
    status: 200,
    description: 'The haircut has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Haircut not found.',
  })
  delete(@Param('id') id: string): Promise<void> {
    return this.haircutService.deleteHaircut(id);
  }
}
