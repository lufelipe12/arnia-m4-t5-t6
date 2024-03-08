import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dtos/create-car.dto";
import { UpdateCarDto } from "./dtos/update-car.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCarDoc } from "./docs/create-car.doc";
import { CreateCarResponseDoc } from "./docs/create-car-response.doc";
import { UpdateCarDoc } from "./docs/update-car.doc";

@Controller("cars")
@ApiTags("cars")
export class CarsController {
  constructor(private carsService: CarsService) {}

  @ApiBody({
    type: CreateCarDoc,
  })
  @ApiResponse({
    type: CreateCarResponseDoc,
  })
  @Post()
  create(@Body() payload: CreateCarDto) {
    return this.carsService.create(payload);
  }

  @ApiResponse({
    type: CreateCarResponseDoc,
    isArray: true,
  })
  @Get()
  findAll(@Query("brand") brand?: string) {
    return this.carsService.findAll(brand);
  }

  @ApiResponse({
    type: CreateCarResponseDoc,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @ApiBody({
    type: UpdateCarDoc,
  })
  @ApiResponse({
    type: CreateCarResponseDoc,
  })
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() payload: UpdateCarDto) {
    return this.carsService.update(id, payload);
  }

  @ApiResponse({
    type: CreateCarResponseDoc,
  })
  @HttpCode(202)
  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.carsService.delete(id);
  }
}
