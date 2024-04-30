import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { RoleEnum } from "./enums/role.enum";
import { RoleGuard } from "./guards/role.guard";
import {
  CreateUserDoc,
  LoginDoc,
  LoginResponseDoc,
  UserCreatedDoc,
} from "../docs";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserCreatedDoc })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.admin)
  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
  })
  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
