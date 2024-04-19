import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "../users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      return await this.usersService.create(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(data: LoginDto) {
    try {
      const user = await this.usersService.getUserBy(data.email);

      if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new UnauthorizedException("Email or password wrong.");
      }

      const tokenPayload = {
        userId: user.id,
        userEmail: user.email,
      };

      return { token: this.jwtService.sign(tokenPayload) };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
