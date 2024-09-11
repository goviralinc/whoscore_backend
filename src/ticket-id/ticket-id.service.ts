import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { GetTicketInfoDto } from './dto/ticket.dto';

import { TicketDataSimplifiedDto } from './dto/ticket-data.dto';

import { crawlSportyTicket } from './crawlers/sporty';
import { crawlBet9jaTicket } from './crawlers/bet9ja';
import { crawlBetwayTicket } from './crawlers/betway';
import { crawlBetkingTicket } from './crawlers/betking';
import { BetPlatform } from 'src/utils/enums';

import { crawlBetKingInfo } from './crawlers/staked/betking';
import { crawlSportyInfo } from './crawlers/staked/sporty';
import { crawlBet9jaInfo } from './crawlers/staked/bet9ja';
import crawlBetwayInfo from './crawlers/staked/betway';

import axios from 'axios';
import { TicketMapper } from 'src/mapper/ticket.mapper';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Bet } from './entities/bet.entity';

@Injectable()
export class TicketIdService {
  constructor(
    private ticketMapper: TicketMapper,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}
  async create(createTicketData: CreateTicketDto) {
    // Create and save each bet individually
    const bets = await Promise.all(
      createTicketData.bets.map(async (betData) => {
        const newBet = this.betRepository.create(betData);
        return this.betRepository.save(newBet);
      }),
    );

    // Create the ticket with the saved bets
    const newTicket = this.ticketRepository.create({
      ...createTicketData,
      bets, // Associate the saved bets
    });

    // Save the ticket
    const savedTicket = await this.ticketRepository.save(newTicket);

    return savedTicket;
  }

  async findByTicketIdAndBetPlatform(
    ticketId: string,
    betPlatform: BetPlatform,
  ) {
    const ticket = await this.ticketRepository.findOne({
      where: { ticketId, betPlatform },
      relations: ['bets'], // Assuming you have a relationship with bets
    });

    console.log(ticket);
    return ticket;
  }

  async ticketInfo(data: GetTicketInfoDto): Promise<TicketDataSimplifiedDto> {
    const ticketIdBaseUrl = process.env.TICKET_ID_API_URL;
    const ticketId = data.ticketId;
    const betPlatform = data.betPlatform;
    let ticketInfo;

    try {
      // Check if ticket already exists in the database
      const existingTicket = await this.findByTicketIdAndBetPlatform(
        ticketId,
        betPlatform,
      );

      console.log(existingTicket);

      if (existingTicket) {
        ticketInfo =
          this.ticketMapper.mapTicketDataToSimplifiedFormat(existingTicket);
        return ticketInfo;
      }

      // Fetch the data from the API if not found in the database
      const apiUrl = `${ticketIdBaseUrl}/?bet_platform=${betPlatform}&bet_code=${ticketId}`;
      const response = await axios.get(apiUrl);
      const responseData = response.data;

      if (responseData.status === 'success') {
        // Map the response data to the CreateTicketDto
        const createTicketData: CreateTicketDto =
          this.ticketMapper.toCreateTicketDto(
            responseData.data,
            ticketId,
            betPlatform,
          );

        // Save the ticket to the database
        const savedTicket = await this.create(createTicketData);

        ticketInfo =
          this.ticketMapper.mapTicketDataToSimplifiedFormat(savedTicket);

        return ticketInfo;
      }

      return responseData;
    } catch (error) {
      const response = error.response;
      console.error('Error fetching betslip:', error);

      if (response && response.status === 400) {
        return response.data;
      } else {
        throw new HttpException(
          'Failed to fetch betslip',
          HttpStatus.BAD_REQUEST,
        );
        //return { status: 'error', message: 'Failed to fetch betslip' };
      }
    }
  }

  async bookedTicketInfo(data: GetTicketInfoDto) {
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
        ticketInfo = await crawlBet9jaTicket(ticketId);
        break;

      case 'betking':
        console.log(betPlatform);
        ticketInfo = await crawlBetkingTicket(ticketId);
        break;
      /**
      case 'betway':
        console.log(betPlatform);
        ticketInfo = await crawlBetwayTicket(ticketId);
        break;
  
      case 'merrybet':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;

      case 'wazobet':
        console.log(betPlatform);
        ticketInfo = betPlatform;
        break;
      */

      default:
        break;
    }

    return ticketInfo;
  }

  async findAll() {
    const tickets = await this.ticketRepository.find({ relations: ['bets'] });
    return tickets;
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: id },
      relations: ['bets'], // Assuming you have a relationship with bets
    });
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    const updatedTicket = this.ticketRepository.merge(ticket, updateTicketDto);
    return this.ticketRepository.save(updatedTicket);
  }

  async remove(id: string) {
    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    await this.ticketRepository.remove(ticket);
    return { message: `Ticket with ID ${id} has been removed` };
  }
}
