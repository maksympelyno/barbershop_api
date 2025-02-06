import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'Client successfully created',
    type: Client,
  })
  @ApiBody({ type: CreateClientDto })
  createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of clients', type: [Client] })
  getAllClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search clients by phone number' })
  @ApiQuery({
    name: 'phone',
    example: '1234567890',
    description: 'Phone number to search',
  })
  @ApiResponse({
    status: 200,
    description: 'List of matching clients',
    type: [Client],
  })
  searchClientsByPhone(@Query('phone') phone: string): Promise<Client[]> {
    return this.clientService.searchClientsByPhone(phone);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({
    name: 'id',
    example: '60c72b2f9b1e8e5f7c8e4b7a',
    description: 'Client ID',
  })
  @ApiResponse({ status: 200, description: 'Client details', type: Client })
  getClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.getClient(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client by ID' })
  @ApiParam({
    name: 'id',
    example: '60c72b2f9b1e8e5f7c8e4b7a',
    description: 'Client ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Deleted client details',
    type: Client,
  })
  deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
