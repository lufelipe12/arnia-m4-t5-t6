import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@CurrentUser() currentUser: { userId: number }) {
    const { userId } = currentUser;
    return await this.usersService.profile(userId);
  }
}
