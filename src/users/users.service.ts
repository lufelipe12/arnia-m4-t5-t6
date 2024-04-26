import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/User.entity';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(payload: RegisterAuthDto) {
    try {
      const userExiste = await this.isEmailExists(payload.email);

      if (userExiste) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }
      const createUser = this.userRepository.create(payload);

      await this.userRepository.save(createUser);

      return createUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async isEmailExists(email: string) {
    try {
      return await this.userRepository.exists({ where: { email } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: {
          email: true,
          id: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getFullUserById(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { id },
        select: {
          email: true,
          id: true,
          password: true,
          role: true,
          name: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepository.update(id, updateUserDto);

      if (!affected) {
        throw new NotFoundException('User not found');
      }

      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async changePassword(userId: number, body: UpdatePasswordDto) {
    try {
      // buscar o usuario
      const user = await this.getFullUserById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // comparar as senhas -> comparar a senha com a senha enviada
      const result = await bcrypt.compare(body.password, user.password);

      if (!result) {
        throw new UnauthorizedException();
      }

      // criar hash e salvar a nova senha
      user.password = await bcrypt.hash(body.newPassword, 10);

      /* user.password = body.newPassword; */

      // salva o usuario
      await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
