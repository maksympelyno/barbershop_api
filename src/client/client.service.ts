import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientModel.create(createClientDto);
  }

  async getAllClients(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async getClient(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  async deleteClient(id: string): Promise<Client> {
    const client = await this.clientModel.findByIdAndDelete(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    return client;
  }

  async searchClientsByPhone(phone: string): Promise<Client[]> {
    return this.clientModel
      .find({ phoneNumber: { $regex: phone, $options: 'i' } })
      .exec();
  }
}
