import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class CreateVisitDto {
  @IsMongoId()
  client: string;

  @IsMongoId()
  haircut: string;

  @IsOptional()
  date?: Date;
}
