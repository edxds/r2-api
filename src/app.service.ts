import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(currentHour: number): string {
    if (currentHour >= 12) {
      return 'R2 says good afternoon!';
    }

    if (currentHour >= 18 && currentHour < 5) {
      return 'R2 says good evening!';
    }

    return 'R2 says good morning!';
  }
}
