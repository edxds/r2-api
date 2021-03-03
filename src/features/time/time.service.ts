import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  getCurrentHour(): number {
    return new Date().getHours();
  }

  getCurrentTimestampHash(): string {
    return Date.now().toString(36);
  }
}
