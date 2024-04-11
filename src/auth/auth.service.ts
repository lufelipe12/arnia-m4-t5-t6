import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      // find user
      const user = await this.usersService.findByEmail(loginDto.email);

      // verify password
      const isCorrect = await bcrypt.compare(loginDto.password, user.password);

      if (!isCorrect) {
        // return error
        throw new UnauthorizedException();
      }

      // return token
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(payload);

      return {
        access_token,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
