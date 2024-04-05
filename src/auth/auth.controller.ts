import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDoc, LoginResponseDoc } from './docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
    status: 201,
    description: 'User successfully authenticated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Email or password wrong.',
  })
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
