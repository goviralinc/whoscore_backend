import { PartialType } from '@nestjs/swagger';
import { CreateTicketIdDto } from './create-ticket-id.dto';

export class UpdateTicketIdDto extends PartialType(CreateTicketIdDto) {}
