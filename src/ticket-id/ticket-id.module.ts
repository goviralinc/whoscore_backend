import { Module } from '@nestjs/common';
import { TicketIdService } from './ticket-id.service';
import { TicketIdController } from './ticket-id.controller';
import { TicketMapper } from 'src/mapper/ticket.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Bet } from './entities/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Bet]),
  ],
  controllers: [TicketIdController],
  providers: [TicketIdService, TicketMapper],
})
export class TicketIdModule {}
