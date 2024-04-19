import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
