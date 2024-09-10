import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketIdService } from './ticket-id.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetTicketInfoDto } from './dto/ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ticket-id')
@ApiTags('Ticket Id')
export class TicketIdController {
  constructor(private readonly ticketIdService: TicketIdService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketIdService.create(createTicketDto);
  }

  @Post('get-info')
  ticketInfo(@Body() getTicketInfoDto: GetTicketInfoDto) {
    return this.ticketIdService.ticketInfo(getTicketInfoDto);
  }

  @Post('get-booked')
  bookedInfo(@Body() getTicketInfoDto: GetTicketInfoDto) {
    return this.ticketIdService.bookedTicketInfo(getTicketInfoDto);
  }

  @Get()
  findAll() {
    return this.ticketIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketIdService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketIdDto: UpdateTicketDto,
  ) {
    return this.ticketIdService.update(id, updateTicketIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketIdService.remove(id);
  }
}
