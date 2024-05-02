import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  credits: number;

  @IsString()
  @IsNotEmpty()
  campus: string;

  @IsString()
  @IsNotEmpty()
  classRoom: string;
}
