import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "../database/entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      if (await this.usersExistsBy(data.email)) {
        throw new BadRequestException(
          `An user with this email: ${data.email} already exists.`,
        );
      }
      const newUser = this.usersRepository.create(data);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async usersExistsBy(email: string) {
    try {
      return await this.usersRepository.exists({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserBy(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: {
          email: true,
          id: true,
          password: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
