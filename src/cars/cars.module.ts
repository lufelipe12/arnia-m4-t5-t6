import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarPhotos, Cars } from '../database/entites';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, CarPhotos])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
