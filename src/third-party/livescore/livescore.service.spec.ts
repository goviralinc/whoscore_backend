import { Test, TestingModule } from '@nestjs/testing';
import { LivescoreService } from './livescore.service';

describe('LivescoreService', () => {
  let service: LivescoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LivescoreService],
    }).compile();

    service = module.get<LivescoreService>(LivescoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
