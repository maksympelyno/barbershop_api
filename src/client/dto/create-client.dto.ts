import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  gender: 'male' | 'female';

  @IsBoolean()
  @IsOptional()
  isRegular?: boolean;
}
