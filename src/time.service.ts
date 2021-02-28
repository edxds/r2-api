import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  getCurrentHour(): number {
    return new Date().getHours();
  }
}
