import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeService } from './time.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, TimeService],
    })
      .overrideProvider(TimeService)
      .useValue({ getCurrentHour: () => 12 })
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Good afternoon!" at 12pm', () => {
      expect(appController.getGreeting()).toBe('R2 says good afternoon!');
    });
  });
});
