import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHaircutDto {
  @ApiProperty({
    example: 'Classic Haircut',
    description: 'The name of the haircut',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'male',
    description: 'The gender for which the haircut is designed',
    enum: ['male', 'female'],
  })
  @IsEnum(['male', 'female'])
  gender: string;

  @ApiProperty({
    example: 20,
    description: 'The price of the haircut in UAH',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Main Branch',
    description: 'The branch where the haircut is available',
  })
  @IsString()
  @IsNotEmpty()
  branch: string;
}
