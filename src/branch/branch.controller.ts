import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './schemas/branch.schema';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  @ApiResponse({
    status: 201,
    description: 'The branch has been successfully created.',
    type: Branch,
  })
  createBranch(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all branches.',
    type: [Branch],
  })
  getAllBranches(): Promise<Branch[]> {
    return this.branchService.getAllBranches();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Branch ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the branch.',
    type: Branch,
  })
  @ApiResponse({
    status: 404,
    description: 'Branch not found.',
  })
  getBranch(@Param('id') id: string): Promise<Branch> {
    return this.branchService.getBranch(id);
  }
}
