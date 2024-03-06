import { Body, Controller, Get, Post, Query } from "@nestjs/common";

import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dtos/create-car.dto";

@Controller("cars")
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  create(@Body() payload: CreateCarDto) {
    return this.carsService.create(payload);
  }

  @Get()
  findAll(@Query("brand") brand?: string) {
    return this.carsService.findAll(brand);
  }
}
