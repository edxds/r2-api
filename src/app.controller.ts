import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { TimeService } from './time.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, //
    private readonly timeService: TimeService,
  ) {}

  @Get()
  getGreeting(): string {
    return this.appService.getGreeting(this.timeService.getCurrentHour());
  }
}
