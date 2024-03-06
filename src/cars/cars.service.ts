import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dtos/create-car.dto";

@Injectable()
export class CarsService {
  private carsDb = [];

  create(payload: CreateCarDto) {
    try {
      if (!payload.brand) {
        throw new BadRequestException("A car needs to have a brand.");
      }

      const carCreated = { id: this.carsDb.length + 1, ...payload };

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
}
