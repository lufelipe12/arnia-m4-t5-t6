import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    private userService: UsersService,
  ) {}
  async create(userId: number, createPetDto: CreatePetDto) {
    try {
      // buscar usuario e verificar se ele existe
      const user = await this.userService.findOne(userId);

      const pet = this.petRepository.create(createPetDto);

      pet.user = user;

      await this.petRepository.save(pet);

      return pet;
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Bad Request',
        },
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll(breed?: string) {
    return this.petRepository.find({ where: { breed } });
  }

  async findOne(id: number) {
    try {
      const pet = await this.petRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });

      return pet;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updatePetDto: UpdatePetDto, userId) {
    try {
      const pet = await this.findOne(id);

      if (pet.user.id !== userId) {
        throw new UnauthorizedException('This pet belongs to other user');
      }

      const { affected } = await this.petRepository.update(id, updatePetDto);

      if (!affected) {
        throw new BadRequestException('Somithing went wrong!');
      }

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMyPets(userId: number) {
    try {
      const pets = await this.petRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      });

      return pets;
    } catch (error) {
      throw new HttpException(
        {
          status: error?.status ?? HttpStatus.BAD_REQUEST,
          message: error,
        },
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
