import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ example: 'Main Branch', description: 'Name of the branch' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123 Main St, City, Country',
    description: 'Address of the branch',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
