import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:3000', credentials: true },
  });

  app.use(cookieParser());
  await app.listen(8080);
}

bootstrap();
