import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClient(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientService.getAllClients();
  }

  @Get('search')
  searchClientsByPhone(@Query('phone') phone: string): Promise<Client[]> {
    return this.clientService.searchClientsByPhone(phone);
  }

  @Get(':id')
  getClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.getClient(id);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
