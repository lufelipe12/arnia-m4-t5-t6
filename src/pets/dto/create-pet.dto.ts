import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}
