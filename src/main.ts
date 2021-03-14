import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as ip from 'ip';

import { AppModule } from './app.module';

const PORT = 8080;
const FRONTEND_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http', 'https'].flatMap((protocol) =>
        ['localhost', ip.address()].map((address) => `${protocol}://${address}:${FRONTEND_PORT}`),
      ),
      credentials: true,
    },
  });

  app.use(cookieParser());
  await app.listen(PORT);
}

bootstrap();
