import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNumber()
  @Max(100)
  age: number;
}
