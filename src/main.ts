import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Arnia - Customer's API")
    .setDescription('API made for personal project for Arnia.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('v1/docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
