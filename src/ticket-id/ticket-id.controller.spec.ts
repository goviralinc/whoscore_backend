import { Test, TestingModule } from '@nestjs/testing';
import { TicketIdController } from './ticket-id.controller';
import { TicketIdService } from './ticket-id.service';

describe('TicketIdController', () => {
  let controller: TicketIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketIdController],
      providers: [TicketIdService],
    }).compile();

    controller = module.get<TicketIdController>(TicketIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
