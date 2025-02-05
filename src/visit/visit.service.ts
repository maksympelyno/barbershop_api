import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';
import { Client, ClientDocument } from 'src/client/schemas/client.schema';
import { Haircut, HaircutDocument } from 'src/haircut/schemas/haircut.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitInfo } from './types/visit-info.interface';

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

  async getAllVisits(): Promise<VisitInfo[]> {
    const visits = await this.visitModel
      .find()
      .populate('client', 'lastName firstName phoneNumber isRegular')
      .populate('haircut', 'name price')
      .exec();

    return visits.map((entry, index) => ({
      _id: entry._id.toString(),
      client: {
        lastName: entry.client.lastName,
        firstName: entry.client.firstName,
        phoneNumber: entry.client.phoneNumber,
        isRegular: entry.client.isRegular,
      },
      haircut: {
        name: entry.haircut.name,
        price: entry.haircut.price,
      },
      finalPrice: entry.finalPrice,
      date: entry.date.toISOString(),
    }));
  }

  async getVisitsByBranchId(branchId: string): Promise<VisitInfo[]> {
    const haircuts = await this.haircutModel.find({ branch: branchId }).exec();

    if (!haircuts.length) {
      throw new NotFoundException('No haircuts found for this branch');
    }
    const haircutIds = haircuts.map((h) => h._id.toString());

    const visits = await this.visitModel
      .find({ haircut: { $in: haircutIds } })
      .populate('client', 'lastName firstName phoneNumber isRegular')
      .populate('haircut', 'name price')
      .exec();

    return visits.map((entry) => ({
      _id: entry._id.toString(),
      client: {
        lastName: entry.client.lastName,
        firstName: entry.client.firstName,
        phoneNumber: entry.client.phoneNumber,
        isRegular: entry.client.isRegular,
      },
      haircut: {
        name: entry.haircut.name,
        price: entry.haircut.price,
      },
      finalPrice: entry.finalPrice,
      date: entry.date.toISOString(),
    }));
  }
}
