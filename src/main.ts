import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("College API")
    .setDescription("This api was made for arnia college students")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("v1/docs", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("v1/");
  await app.listen(configService.get("PORT") || 3000);
}
bootstrap();