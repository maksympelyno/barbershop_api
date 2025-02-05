import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Haircut, HaircutDocument } from 'src/haircut/schemas/haircut.schema';
import { Visit, VisitDocument } from 'src/visit/schemas/visit.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Visit.name) private readonly visitModel: Model<VisitDocument>,

    @InjectModel(Haircut.name)
    private readonly haircutModel: Model<HaircutDocument>,
  ) {}

  async getTotalClients(branchId: string): Promise<number> {
    const clientIds = await this.visitModel
      .distinct('client', {
        haircut: { $in: await this.getHaircutIds(branchId) },
      })
      .exec();

    return clientIds.length;
  }

  async getTotalVisits(branchId: string): Promise<number> {
    return this.visitModel
      .countDocuments({ haircut: { $in: await this.getHaircutIds(branchId) } })
      .exec();
  }

  async getMostPopularHaircut(branchId: string): Promise<any> {
    return this.visitModel
      .aggregate([
        { $match: { haircut: { $in: await this.getHaircutIds(branchId) } } },
        { $group: { _id: '$haircut', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .exec();
  }

  async getAveragePrice(branchId: string): Promise<number> {
    const result = await this.visitModel
      .aggregate([
        { $match: { haircut: { $in: await this.getHaircutIds(branchId) } } },
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
        { $match: { haircut: { $in: await this.getHaircutIds(branchId) } } },
        { $group: { _id: null, totalRevenue: { $sum: '$finalPrice' } } },
      ])
      .exec();
    return result.length > 0 ? result[0].totalRevenue : 0;
  }

  // Отримання ID всіх стрижок, які відносяться до конкретної філії
  private async getHaircutIds(branchId: string): Promise<string[]> {
    const haircuts = await this.haircutModel
      .find({ branch: branchId })
      .select('_id')
      .exec();
    return haircuts.map((h) => h._id.toString());
  }
}
