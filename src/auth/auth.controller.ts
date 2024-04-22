import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { RoleEnum } from "./enums/role.enum";
import { RoleGuard } from "./guards/role.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
