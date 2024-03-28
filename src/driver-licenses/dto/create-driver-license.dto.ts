import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDriverLicenseDto {
  @IsNotEmpty()
  @IsNumber()
  licenseNumber: number;
}
