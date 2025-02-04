import { Injectable, NotFoundException } from '@nestjs/common';
import { Haircut, HaircutDocument } from './schemas/haircut.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHaircutDto } from './dto/create-haircut.dto';
import { UpdateHaircutDto } from './dto/update-haircut.dto';

@Injectable()
export class HaircutService {
  constructor(
    @InjectModel(Haircut.name)
    private readonly haircutModel: Model<HaircutDocument>,
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
}
