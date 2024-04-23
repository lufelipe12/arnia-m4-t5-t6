import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RoleEnum } from "../auth/enums/role.enum";
import { RoleGuard } from "../auth/guards/role.guard";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleEnum.admin, RoleEnum.instructor)
  @Get()
  async list() {
    return await this.usersService.list();
  }

  @Roles(RoleEnum.admin, RoleEnum.instructor)
  @Get(":id")
  async show(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.show(id);
  }

  @Roles(RoleEnum.admin)
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.update(id, data);
  }

  @Roles(RoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
