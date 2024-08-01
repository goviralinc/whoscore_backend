import { Test, TestingModule } from '@nestjs/testing';
import { TicketIdService } from './ticket-id.service';

describe('TicketIdService', () => {
  let service: TicketIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketIdService],
    }).compile();

    service = module.get<TicketIdService>(TicketIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
