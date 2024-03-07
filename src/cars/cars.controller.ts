import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car.dto";

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

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() payload: UpdateCarDto) {
    return this.carsService.update(id, payload);
  }
}
