import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get('port'));
  console.log(config.get('port'));
}

bootstrap();
