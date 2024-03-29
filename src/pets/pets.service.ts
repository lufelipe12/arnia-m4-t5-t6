import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
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

  findAll() {
    return `This action returns all pets`;
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

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
