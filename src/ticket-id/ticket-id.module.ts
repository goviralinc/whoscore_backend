import { Module } from '@nestjs/common';
import { TicketIdService } from './ticket-id.service';
import { TicketIdController } from './ticket-id.controller';

@Module({
  controllers: [TicketIdController],
  providers: [TicketIdService],
})
export class TicketIdModule {}
