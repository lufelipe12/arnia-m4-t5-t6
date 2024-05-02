import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "../database/entities";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

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
          role: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async list() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async show(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`An user with this id:${id} not found.`);
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword(userId: number, data: ChangePasswordDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
        select: {
          id: true,
          password: true,
          age: true,
        },
      });

      if (!(await bcrypt.compare(data.currentPassword, user.password))) {
        throw new UnauthorizedException("Passwords dont match.");
      }

      user.password = data.newPassword;

      await this.usersRepository.update(userId, user);

      return await this.usersRepository.findOne({
        where: { id: userId },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      await this.show(id);

      await this.usersRepository.update(id, data);

      return await this.show(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async reactivate(id: number) {
    try {
      await this.usersRepository.restore(id);

      return { response: "User restored with success." };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.show(id);

      await this.usersRepository.softDelete(id);

      return { response: "User deleted with success." };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
