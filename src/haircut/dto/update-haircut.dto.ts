import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHaircutDto {
  @ApiProperty({
    example: 'Classic Haircut',
    description: 'The name of the haircut',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender for which the haircut is designed',
    enum: ['male', 'female'],
    required: false,
  })
  @IsEnum(['male', 'female'])
  @IsOptional()
  gender?: string;

  @ApiProperty({
    example: 20,
    description: 'The price of the haircut in dollars',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'Main Branch',
    description: 'The branch where the haircut is available',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  branch?: string;
}
