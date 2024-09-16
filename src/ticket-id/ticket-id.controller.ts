import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketIdService } from './ticket-id.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetTicketInfoDto } from './dto/ticket.dto';
import { TicketDataSimplifiedDto } from './dto/ticket-data.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ticket-id')
@ApiTags('Ticket Id')
export class TicketIdController {
  constructor(private readonly ticketIdService: TicketIdService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketIdService.create(createTicketDto);
  }

  @Post('get-info')
  @ApiResponse({ type: TicketDataSimplifiedDto })
  async ticketInfo(
    @Body() getTicketInfoDto: GetTicketInfoDto,
  ): Promise<TicketDataSimplifiedDto> {
    try {
      return this.ticketIdService.ticketInfo(getTicketInfoDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
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
  update(@Param('id') id: string, @Body() updateTicketIdDto: UpdateTicketDto) {
    return this.ticketIdService.update(id, updateTicketIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketIdService.remove(id);
  }
}
