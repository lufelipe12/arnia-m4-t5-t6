import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPetDto: CreatePetDto, @Req() request: Request) {
    const user = request['user'];
    return this.petsService.create(user.sub, createPetDto);
  }

  @Get()
  findAll(@Query('breed') breed?: string) {
    return this.petsService.findAll(breed);
  }

  @UseGuards(AuthGuard)
  @Get('my-pets')
  findMyPeys(@Req() req: Request) {
    const user = req['user'];
    return this.petsService.findMyPets(+user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.petsService.update(+id, updatePetDto, +user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
