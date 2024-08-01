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
import { CreateTicketIdDto } from './dto/create-ticket-id.dto';
import { UpdateTicketIdDto } from './dto/update-ticket-id.dto';
import { GetTicketInfoDto } from './dto/ticket-id.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ticket-id')
@ApiTags('Ticket Id')
export class TicketIdController {
  constructor(private readonly ticketIdService: TicketIdService) {}

  @Post()
  create(@Body() createTicketIdDto: CreateTicketIdDto) {
    return this.ticketIdService.create(createTicketIdDto);
  }

  @Post('get-info')
  ticketInfo(@Body() getTicketInfoDto: GetTicketInfoDto) {
    return this.ticketIdService.ticketInfo(getTicketInfoDto);
  }

  @Get()
  findAll() {
    return this.ticketIdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketIdService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketIdDto: UpdateTicketIdDto,
  ) {
    return this.ticketIdService.update(+id, updateTicketIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketIdService.remove(+id);
  }
}
