import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateBetDto } from './bet.dto';

export class CreateTicketDto {
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

  @ApiPropertyOptional({
    description: 'List of bets associated with this ticket',
    type: [CreateBetDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateBetDto)
  bets?: CreateBetDto[];
}
