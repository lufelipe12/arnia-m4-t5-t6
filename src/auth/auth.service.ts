import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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
      if (user.password !== loginDto.password) {
        // return error
        throw new UnauthorizedException();
      }

      // return token
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
