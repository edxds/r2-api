import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeService } from './time.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TimeService],
})
export class AppModule {}
