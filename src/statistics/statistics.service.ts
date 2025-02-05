import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Haircut, HaircutDocument } from 'src/haircut/schemas/haircut.schema';
import { Visit, VisitDocument } from 'src/visit/schemas/visit.schema';
import { PopularHaircut } from './types/statistics.interface';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Visit.name) private readonly visitModel: Model<VisitDocument>,
    @InjectModel(Haircut.name)
    private readonly haircutModel: Model<HaircutDocument>,
  ) {}

  async getTotalClients(branchId: string): Promise<number> {
    const clientIds = await this.visitModel
      .distinct('client', { branch: branchId })
      .exec();

    return clientIds.length;
  }

  async getTotalVisits(branchId: string): Promise<number> {
    return this.visitModel.countDocuments({ branch: branchId }).exec();
  }

  async getMostPopularHaircut(
    branchId: string,
  ): Promise<PopularHaircut | null> {
    const popularHaircut = await this.visitModel
      .aggregate([
        { $match: { branch: branchId } },
        { $group: { _id: '$haircut', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .exec();

    if (popularHaircut.length === 0) {
      return null;
    }

    const haircutId = popularHaircut[0]._id;
    const haircut = await this.haircutModel.findById(haircutId).exec();

    if (!haircut) {
      throw new Error('Haircut not found');
    }

    return {
      _id: haircut._id.toString(),
      name: haircut.name,
      count: popularHaircut[0].count,
    };
  }

  async getAveragePrice(branchId: string): Promise<number> {
    const result = await this.visitModel
      .aggregate([
        { $match: { branch: branchId } },
        {
          $group: { _id: null, avgPrice: { $avg: '$finalPrice' } },
        },
      ])
      .exec();
    return result.length > 0 ? result[0].avgPrice : 0;
  }

  async getTotalRevenue(branchId: string): Promise<number> {
    const result = await this.visitModel
      .aggregate([
        { $match: { branch: branchId } },
        { $group: { _id: null, totalRevenue: { $sum: '$finalPrice' } } },
      ])
      .exec();
    return result.length > 0 ? result[0].totalRevenue : 0;
  }
}
