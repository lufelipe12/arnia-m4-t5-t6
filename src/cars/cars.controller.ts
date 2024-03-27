import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('color') color?: string,
  ) {
    return await this.carsService.findAll(page, limit, color);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCarDto,
  ) {
    return await this.carsService.update(id, payload);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.delete(id);
  }
}
