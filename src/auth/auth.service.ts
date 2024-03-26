import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { Users } from '../database/entites';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const { email, password } = payload;

      const user = await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const tokenPayload = {
        iss: 'arnia_cars',
        sub: 'users_auth',
        aud: 'arnia_cars_users',
        userEmail: user.email,
        userId: user.id,
      };

      return {
        accessToken: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
