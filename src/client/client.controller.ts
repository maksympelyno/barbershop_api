import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClient(@Param('id') id: string) {
    return this.clientService.getClient(id);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}
