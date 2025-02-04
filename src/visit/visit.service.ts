import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { Client, ClientDocument } from 'src/client/schemas/client.schema';
import { Haircut, HaircutDocument } from 'src/haircut/schemas/haircut.schema';
import { CreateVisitDto } from './dto/create-visit.dto';

@Injectable()
export class VisitService {
  constructor(
    @InjectModel(Visit.name) private readonly visitModel: Model<VisitDocument>,
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
    @InjectModel(Haircut.name)
    private readonly haircutModel: Model<HaircutDocument>,
  ) {}

  async createVisit(createVisitDto: CreateVisitDto): Promise<Visit> {
    const client = await this.clientModel.findById(createVisitDto.client);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const haircut = await this.haircutModel.findById(createVisitDto.haircut);
    if (!haircut) {
      throw new NotFoundException('Haircut not found');
    }

    // Обчислення ціни з урахуванням можливих знижок, бонусів та іншого, на основі даних про клієнта/стрижку/філію
    let finalPrice = haircut.price;
    if (client.isRegular) {
      finalPrice *= 0.97;
    }

    const visit = await this.visitModel.create({
      ...createVisitDto,
      finalPrice,
    });

    if (!client.isRegular) {
      const visitCount = await this.visitModel.countDocuments({
        client: client._id,
      });

      if (visitCount >= 5) {
        await this.clientModel.updateOne(
          { _id: client._id },
          { $set: { isRegular: true } },
        );
      }
    }

    return visit;
  }
}
