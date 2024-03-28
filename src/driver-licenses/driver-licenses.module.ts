import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverLicensesService } from './driver-licenses.service';
import { DriverLicensesController } from './driver-licenses.controller';
import { DriverLicenses } from '../database/entites';

@Module({
  imports: [TypeOrmModule.forFeature([DriverLicenses])],
  controllers: [DriverLicensesController],
  providers: [DriverLicensesService],
})
export class DriverLicensesModule {}
