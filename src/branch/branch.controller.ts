import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './schemas/branch.schema';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  createBranch(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  getAllBranches(): Promise<Branch[]> {
    return this.branchService.getAllBranches();
  }

  @Get(':id')
  getBranch(@Param('id') id: string): Promise<Branch> {
    return this.branchService.getBranch(id);
  }
}
