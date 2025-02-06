import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({
    description: 'The client ID',
    type: String,
    example: '60d4f8f7e4b0e7d5b7c8c4f9',
  })
  @IsMongoId()
  client: string;

  @ApiProperty({
    description: 'The haircut ID ',
    type: String,
    example: '60d4f8f7e4b0e7d5b7c8c4fa',
  })
  @IsMongoId()
  haircut: string;

  @ApiProperty({
    description: 'The date of the visit (optional)',
    type: String,
    format: 'date-time',
    example: '2025-02-06T15:30:00.000Z',
    required: false,
  })
  @IsOptional()
  date?: Date;
}
