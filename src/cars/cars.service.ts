import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dto/create-car.dto';
import { CarPhotos, Cars } from '../database/entites';
import { UpdateCarDto } from './dto/update-car.dto';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
    @InjectRepository(CarPhotos)
    private carPhotosRepository: Repository<CarPhotos>,

    private configService: ConfigService,
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

  async uploadPhoto(id: number, photo: Express.Multer.File) {
    try {
      if (!photo) {
        throw new BadRequestException('File is not an image.');
      }

      const car = await this.findOne(id);

      const photoUrl = `${this.configService.get('BASE_URL')}cars/photos/${photo.filename}`;

      const newCarPhoto = this.carPhotosRepository.create({
        photoUrl,
        car: { id: car.id },
      });

      await this.carPhotosRepository.save(newCarPhoto);

      return newCarPhoto;
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
        relations: {
          user: true,
          photos: true,
        },
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

  async update(id: number, payload: UpdateCarDto, currentUser: CurrentUserDto) {
    try {
      const carToUpdate = await this.findOne(id);

      if (carToUpdate.user && carToUpdate.user.id !== currentUser.userId) {
        throw new BadRequestException('Thats not your car.');
      }

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
