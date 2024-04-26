import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  register(registerAuthDto: RegisterAuthDto) {
    return this.userService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      // buscar usuario
      const user = await this.userService.getUserByEmail(loginAuthDto.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // comparar senha
      const compare = await bcrypt.compare(
        loginAuthDto.password,
        user.password,
      );

      if (!compare) {
        throw new UnauthorizedException('Email or password wrong');
      }

      // criar o token
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
      };

      const access_token = await this.jwtService.signAsync(payload);

      // retornar token
      return {
        access_token,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
