import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeService } from './time.service';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService, TimeService],
})
export class AppModule {}
