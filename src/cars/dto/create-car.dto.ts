import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  carName: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1885)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
