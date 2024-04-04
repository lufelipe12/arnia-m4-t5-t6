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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Response } from 'express';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Post(':id/buy')
  async buy(
    @CurrentUser() currentUser: { userId: number },
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { userId } = currentUser;
    return await this.carsService.buy(userId, id);
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

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = file.originalname.split('.')[1];

          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + extension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
          return cb(null, false);
        }

        cb(null, true);
      },
    }),
  )
  @Post(':id/upload-photo')
  async uploadPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.carsService.uploadPhoto(id, photo);
  }

  @Get('photos/:filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
}
