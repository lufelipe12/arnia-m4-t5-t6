import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../database/entites';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(payload: CreateUserDto) {
    try {
      if (await this.isEmailExists(payload.email)) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }

      const userToCreate = this.usersRepository.create(payload);

      await this.usersRepository.save(userToCreate);

      return userToCreate;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async isEmailExists(email: string) {
    try {
      return await this.usersRepository.exists({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async profile(id: number) {
    try {
      return await this.usersRepository.findOne({
        where: { id },
        relations: {
          driverLicense: true,
          cars: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
