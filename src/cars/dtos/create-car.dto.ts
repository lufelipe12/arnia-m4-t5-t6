import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1886)
  @Max(new Date().getFullYear())
  year: number;
}
