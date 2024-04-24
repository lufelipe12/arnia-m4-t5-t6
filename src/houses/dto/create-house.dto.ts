import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  area: number;

  @IsNumber()
  sellerId: number;
}
