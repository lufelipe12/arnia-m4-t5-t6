import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  register(registerAuthDto: RegisterAuthDto) {
    return this.userService.create(registerAuthDto);
  }
}
