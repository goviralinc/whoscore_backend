import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class BetSimplifiedDto {
  @ApiProperty({ description: 'Date of the event' })
  @IsString()
  date: string;

  @ApiProperty({ description: 'Type of the odds' })
  @IsString()
  oddType: string;

  @ApiProperty({ description: 'Type of the bet' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Time of the event' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'Home team' })
  @IsString()
  hometeam: string;

  @ApiProperty({ description: 'Away team' })
  @IsString()
  awayteam: string;

  @ApiProperty({ description: 'Odds for the bet' })
  @IsString()
  odds: string;

  @ApiPropertyOptional({ description: 'Status of the bet', nullable: true })
  @IsString()
  @IsOptional()
  bet_status?: string;

  @ApiPropertyOptional({ description: 'Scores of the event', nullable: true })
  @IsString()
  @IsOptional()
  scores?: string;
}

export class TicketInfoDto {
  @ApiProperty({ description: 'Type of the ticket' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Total stake amount' })
  @IsString()
  totalStake: string;

  @ApiProperty({ description: 'Total odds of the ticket' })
  @IsString()
  totalOdds: string;

  @ApiPropertyOptional({ description: 'Potential winnings', nullable: true })
  @IsString()
  @IsOptional()
  potentialWin?: string;
}

class TicketDataContentDto {
  @ApiProperty({
    description: 'List of bets',
    type: [BetSimplifiedDto],
  })
  @ValidateNested({ each: true })
  @Type(() => BetSimplifiedDto)
  bets: BetSimplifiedDto[];

  @ApiProperty({ description: 'Ticket information', type: TicketInfoDto })
  @ValidateNested()
  @Type(() => TicketInfoDto)
  info: TicketInfoDto;
}

export class TicketDataSimplifiedDto {
  @ApiProperty({ description: 'Status of the response' })
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Data containing bets and ticket info',
    type: TicketDataContentDto,
  })
  @ValidateNested()
  @Type(() => TicketDataContentDto)
  data: TicketDataContentDto;
}
