import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { Cars } from '../database/entites';
import { Repository } from 'typeorm';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
  ) {}

  async create(payload: CreateCarDto) {
    try {
      const newCar = this.carsRepository.create(payload);

      await this.carsRepository.save(newCar);

      return newCar;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async buy(userId: number, id: number) {
    try {
      const carToBuy = await this.findOne(id);

      await this.carsRepository.save(
        Object.assign(carToBuy, { user: { id: userId } }),
      );

      return { message: 'Car purschased.', car: carToBuy };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(page: number, limit: number, color?: string) {
    try {
      const carsData = await this.carsRepository.find({
        where: { color },
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page: +page,
        pageSize: +limit,
        quantity: carsData.length,
        data: carsData,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const carFound = await this.carsRepository.findOne({
        where: { id },
      });

      if (!carFound) {
        throw new NotFoundException(`A car with this id: ${id} not found.`);
      }

      return carFound;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateCarDto) {
    try {
      const carToUpdate = await this.findOne(id);

      await this.carsRepository.update(carToUpdate.id, payload);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.findOne(id);

      await this.carsRepository.softDelete(id);

      return { status: 'ok' };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
