import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { EventEmitterModule } from '@nestjs/event-emitter';
import multer from 'multer';
import { APP_INTERCEPTOR } from '@nestjs/core';

import config from '../ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeModule } from './features/time';
import { UsersModule } from './features/users';
import { AuthModule, AuthInterceptor } from './features/auth';
import { StorageModule } from './features/storage';
import { PostModule } from './features/post';
import { CommunityModule } from './features/community/community.module';

const memoryStorage = multer.memoryStorage();

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MulterModule.register({ storage: memoryStorage }),
    EventEmitterModule.forRoot({
      ignoreErrors: true,
    }),
    UsersModule,
    AuthModule,
    TimeModule,
    StorageModule,
    CommunityModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: AuthInterceptor }],
})
export class AppModule {}
