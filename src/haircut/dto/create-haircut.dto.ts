import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHaircutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['male', 'female'])
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  branch: string;
}
