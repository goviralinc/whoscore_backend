import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TeamDto } from './team.dto';
import { CompetitionDto } from './competition.dto';


export class MatchDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: CompetitionDto
  })
  competition: CompetitionDto;

  @ApiProperty({
    description: 'Details of the home team',
    type: TeamDto,
  })
  homeTeam: TeamDto;

  @ApiProperty({
    description: 'Details of the away team',
    type: TeamDto,
  })
  awayTeam: TeamDto;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'Scheduled date and time of the fixture in UTC',
    example: '2024-10-26T16:30:00Z',
  })
  @IsString()
  date: string;
}
