import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Patch,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/dto/current-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateUserDto) {
    return this.usersService.update(+id, updateHouseDto);
  }
  @UseGuards(AuthGuard)
  @Post('/change-password')
  changePassword(
    @CurrentUser() user: CurrentUserDto,
    @Body() updateHouseDto: UpdatePasswordDto,
  ) {
    return this.usersService.changePassword(user.sub, updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
