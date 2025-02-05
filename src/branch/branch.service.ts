import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { Model } from 'mongoose';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<BranchDocument>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const newBranch = new this.branchModel(createBranchDto);
    return await newBranch.save();
  }

  async getAllBranches(): Promise<Branch[]> {
    return await this.branchModel.find().exec();
  }

  async getBranch(id: string): Promise<Branch> {
    const branch = await this.branchModel.findById(id).exec();
    if (!branch) {
      throw new NotFoundException(`Branch with id ${id} not found`);
    }
    return branch;
  }
}
