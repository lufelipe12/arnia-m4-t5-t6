import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtOptions } from './jwt/jwt.config';
import { Users } from '../database/entites';

@Module({
  imports: [
    JwtModule.registerAsync({ ...jwtOptions, global: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
