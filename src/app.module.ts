import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeService } from './time.service';
import { UsersModule } from './features/users';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule],
  controllers: [AppController],
  providers: [AppService, TimeService],
})
export class AppModule {}
