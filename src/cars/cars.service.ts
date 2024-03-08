import { HttpException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car.dto";

@Injectable()
export class CarsService {
  private carsDb = [];

  create(payload: CreateCarDto) {
    try {
      const carCreated = { id: new Date().getTime(), ...payload };

      this.carsDb.push(carCreated);

      return carCreated;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  findAll(brand?: string) {
    try {
      if (brand) {
        return this.carsDb.filter((car) => car.brand === brand);
      }

      return this.carsDb;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  findOne(id: number) {
    try {
      const carFound = this.carsDb.find((car) => car.id === id);

      if (!carFound) {
        throw new NotFoundException(`A car with this id:${id} not found.`);
      }

      return carFound;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  update(id: number, payload: UpdateCarDto) {
    try {
      const carToUpdate = this.findOne(id);

      return Object.assign(carToUpdate, payload);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  delete(id: number) {
    try {
      const carToDelete = this.findOne(id);

      this.carsDb = this.carsDb.filter((car) => car.id !== carToDelete.id);

      return carToDelete;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
