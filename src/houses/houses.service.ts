import { Repository } from 'typeorm';
import {
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
  async create(createHouseDto: CreateHouseDto) {
    const { sellerId, ...house } = createHouseDto;

    try {
      const seller = await this.userService.findOne(sellerId);

      const createHouse = this.houseRepository.create(house);

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
}
