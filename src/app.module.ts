import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeModule } from './features/time';
import { UsersModule } from './features/users';
import { AuthModule } from './features/auth';
import { CommunityModule } from './features/community/community.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, AuthModule, TimeModule, CommunityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
