import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'src/database/entities/House.entity';
import { UsersService } from 'src/users/users.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House)
    private houseRepository: Repository<House>,

    private userService: UsersService,
  ) {}
  async create(createHouseDto: CreateHouseDto, sellerId: number) {
    try {
      const seller = await this.userService.findOne(sellerId);

      const createHouse = this.houseRepository.create(createHouseDto);

      createHouse.seller = seller;

      return await this.houseRepository.save(createHouse);
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.houseRepository.find({
      relations: {
        seller: true,
        owner: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.houseRepository.findOneOrFail({
        where: { id },
        relations: {
          seller: true,
          owner: true,
        },
      });
    } catch (error) {
      throw new NotFoundException("House don't found");
    }
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }

  async buyHouse(id: number, userId: number) {
    try {
      const house = await this.findOne(id);

      if (!house.seller) {
        throw new BadRequestException("House isn't selling");
      }

      const user = await this.userService.findOne(userId);

      house.owner = user;
      house.seller = null;

      await this.houseRepository.save(house);

      return house;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log('id', id);
    console.log('userId', userId);
  }
}
