import { Injectable, NotFoundException } from '@nestjs/common';
import { Haircut, HaircutDocument } from './schemas/haircut.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';
import { History, HistoryDocument } from './schemas/price-history.schema';
import { HistoryChange } from './types/history-change.interface';
import { HaircutFilter } from './types/haircat-filter.interface';

@Injectable()
export class HaircutService {
  constructor(
    @InjectModel(Haircut.name)
    private readonly haircutModel: Model<HaircutDocument>,
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}

  async createHaircut(createHaircutDto: CreateHaircutDto): Promise<Haircut> {
    const createdHaircut = new this.haircutModel(createHaircutDto);

    await createdHaircut.save();
    return createdHaircut;
  }

  async updateHaircut(
    id: string,
    updateHaircutDto: UpdateHaircutDto,
  ): Promise<Haircut> {
    const haircut = await this.haircutModel.findByIdAndUpdate(
      id,
      updateHaircutDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!haircut) {
      throw new NotFoundException(`Haircut with id ${id} not found`);
    }

    return haircut;
  }

  async getAllHaircuts(): Promise<Haircut[]> {
    return this.haircutModel.find().exec();
  }

  async getHaircutById(id: string): Promise<Haircut> {
    const haircut = await this.haircutModel.findById(id).exec();
    if (!haircut) {
      throw new NotFoundException(`Haircut with id ${id} not found`);
    }
    return haircut;
  }

  async getHaircutsByBranch(
    branchId: string,
    name?: string,
  ): Promise<Haircut[]> {
    const filter: HaircutFilter = {
      branch: branchId,
    };

    if (name) {
      filter.name = new RegExp(name, 'i');
    }

    return this.haircutModel.find(filter).exec();
  }

  async deleteHaircut(id: string): Promise<void> {
    const result = await this.haircutModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Haircut with id ${id} not found`);
    }
  }

  async getPriceHistory(id: string): Promise<HistoryChange[]> {
    const history = await this.historyModel
      .find({ haircut: id })
      .sort({ createdAt: 1 })
      .exec();

    return history.map((entry, index) => ({
      changeNumber: index + 1,
      oldPrice: entry.oldPrice,
      newPrice: entry.newPrice,
      changedAt: entry.createdAt.toISOString(),
      priceDifference: entry.newPrice - entry.oldPrice,
    }));
  }
}
