import { Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(error?.message || 'User not found');
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          email,
        },
        select: {
          createdAt: true,
          email: true,
          id: true,
          isActive: true,
          password: true,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // este metodo UPDATE retorna um objeto que contém affected. Este atributo representa quantas linhas este método afetou.
      // Como estamos buscando através do ID que é único, corre o risco de atingir apenas 1 ou 0
      // se for 1, segnigica que alterou
      // se for 0, significa que o ID não existe no banco, logo deve retornar a mensagem apropriada
      const { affected } = await this.userRepository.update(id, updateUserDto);
      if (!affected) {
        throw new NotFoundException(`User ${id} does not exist`);
      }

      // apos alterar, se não entrou no IF anterior, deve retornar o usuárion atualizado.
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Internal Server Error',
        },
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async softDelete(id: number) {
    try {
      // este metodo UPDATE retorna um objeto que contém affected. Este atributo representa quantas linhas este método afetou.
      // Como estamos buscando através do ID que é único, corre o risco de atingir apenas 1 ou 0
      // se for 1, segnigica que alterou
      // se for 0, significa que o ID não existe no banco, logo deve retornar a mensagem apropriada
      const { affected } = await this.userRepository.update(id, {
        isActive: false,
      });

      if (!affected) {
        throw new NotFoundException(`User ${id} does not exist`);
      }

      return;
    } catch (error) {
      throw new HttpException(
        {
          message: error?.message ?? 'Internal Server Error',
        },
        error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async profile(id: number) {
    try {
      const user = this.userRepository.findOneOrFail({
        where: {
          id,
        },
        relations: {
          address: true,
          pets: true,
          events: true,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
