import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RoleEnum } from "../auth/enums/role.enum";
import { RoleGuard } from "../auth/guards/role.guard";

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
}
