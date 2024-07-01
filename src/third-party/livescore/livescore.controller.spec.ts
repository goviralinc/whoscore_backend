import { Test, TestingModule } from '@nestjs/testing';
import { LivescoreController } from './livescore.controller';
import { LivescoreService } from './livescore.service';

describe('LivescoreController', () => {
  let controller: LivescoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivescoreController],
      providers: [LivescoreService],
    }).compile();

    controller = module.get<LivescoreController>(LivescoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
