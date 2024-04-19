import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConfig } from "./jwt.config";

@Module({
  imports: [JwtModule.registerAsync({ ...jwtConfig, global: true })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
