import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    secret: configService.get("JWT_SECRET"),
    signOptions: {
      expiresIn: configService.get("JWT_EXPIRATION"),
    },
  }),
};
