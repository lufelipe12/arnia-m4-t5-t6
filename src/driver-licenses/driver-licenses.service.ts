import { HttpException, Injectable } from '@nestjs/common';

import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverLicenses } from '../database/entites';
import { Repository } from 'typeorm';

@Injectable()
export class DriverLicensesService {
  constructor(
    @InjectRepository(DriverLicenses)
    private driverLicensesRepository: Repository<DriverLicenses>,
  ) {}

  async create(userId: number, payload: CreateDriverLicenseDto) {
    try {
      const newDriverLicense = this.driverLicensesRepository.create({
        licenseNumber: payload.licenseNumber,
        user: { id: userId },
      });

      await this.driverLicensesRepository.save(newDriverLicense);

      return newDriverLicense;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
