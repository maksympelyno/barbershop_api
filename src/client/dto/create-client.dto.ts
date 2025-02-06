import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Doe', description: 'Client last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'John', description: 'Client first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Edward', description: 'Client middle name' })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: '+1234567890', description: 'Client phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'male',
    description: 'Client gender',
    enum: ['male', 'female'],
  })
  @IsString()
  @IsNotEmpty()
  gender: 'male' | 'female';

  @IsBoolean()
  @IsOptional()
  isRegular?: boolean;
}
