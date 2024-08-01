import { Injectable } from '@nestjs/common';
import { CreateTicketIdDto } from './dto/create-ticket-id.dto';
import { UpdateTicketIdDto } from './dto/update-ticket-id.dto';
import { GetTicketInfoDto } from './dto/ticket-id.dto';
import { crawlSportyTicket } from './crawlers/sporty';

@Injectable()
export class TicketIdService {
  create(createTicketIdDto: CreateTicketIdDto) {
    return 'This action adds a new ticketId';
  }

  async ticketInfo(data: GetTicketInfoDto) {
    const ticketId = data.ticketId;
    const betPlatform = data.betPlatform;
    let ticketInfo;
    switch (betPlatform) {
      case 'sportybet':
        console.log(betPlatform);
        ticketInfo = await crawlSportyTicket(ticketId);
        break;

      case 'bet9ja':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      case 'betway':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      case 'betking':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      case 'merrybet':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      case 'wazobet':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      default:
        break;
    }

    return ticketInfo;
  }

  findAll() {
    return `This action returns all ticketId`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketId`;
  }

  update(id: number, updateTicketIdDto: UpdateTicketIdDto) {
    return `This action updates a #${id} ticketId`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketId`;
  }
}
