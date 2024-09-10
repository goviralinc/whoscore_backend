import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BetDto } from './bet.dto';
import { BetPlatform } from 'src/utils/enums';

export class GetTicketInfoDto {
  @ApiProperty()
  @IsString()
  ticketId: string;

  @ApiProperty({ enum: BetPlatform })
  @IsEnum({ type: BetPlatform })
  betPlatform: BetPlatform;
}

export class TicketDto {
  @ApiProperty({ description: 'Unique identifier of the ticket' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Ticket ID' })
  @IsString()
  ticketId: string;

  @ApiProperty({ description: 'Betting platform' })
  @IsString()
  betPlatform: string;

  @ApiPropertyOptional({ description: 'Type of the ticket', nullable: true })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ description: 'Total stake amount' })
  @IsString()
  totalStake: string;

  @ApiProperty({ description: 'Total odds' })
  @IsString()
  totalOdds: string;

  @ApiPropertyOptional({ description: 'Potential winnings', nullable: true })
  @IsString()
  @IsOptional()
  potentialWin?: string;

  @ApiPropertyOptional({ description: 'Gross winnings', nullable: true })
  @IsString()
  @IsOptional()
  grossWinnings?: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @IsDateString()
  createdAt: Date;

  @ApiPropertyOptional({ description: 'Last updated timestamp' })
  @IsDateString()
  @IsOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({ description: 'Deleted timestamp', nullable: true })
  @IsDateString()
  @IsOptional()
  deletedDate?: Date;

  @ApiProperty({
    description: 'List of bets associated with this ticket',
    type: [BetDto],
  })
  @ValidateNested({ each: true })
  @Type(() => BetDto)
  bets: BetDto[];
}
