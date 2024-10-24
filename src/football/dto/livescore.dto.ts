import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LivescoreMatchDto {
  @ApiProperty({
    description: 'Name of the competition (e.g., Premier League)',
    example: 'Premier League',
  })
  @IsString()
  competition: string;

  @ApiProperty({
    description: 'Home team name',
    example: 'Everton FC',
  })
  @IsString()
  homeTeam: string;

  @ApiProperty({
    description: 'Away team name',
    example: 'Fulham FC',
  })
  @IsString()
  awayTeam: string;

  @ApiProperty({
    description: 'Home team score',
    example: 2,
  })
  @IsNumber()
  homeScore: number;

  @ApiProperty({
    description: 'Away team score',
    example: 1,
  })
  @IsNumber()
  awayScore: number;

  @ApiProperty({
    description: 'Date and time of the match in UTC format',
    example: '2024-10-26T16:30:00Z',
  })
  @IsString()
  utcDate: string;

  @ApiProperty({
    description: 'URL for the home team logo',
    example: 'https://crests.football-data.org/62.png',
  })
  @IsString()
  homeLogoUrl: string;

  @ApiProperty({
    description: 'URL for the away team logo',
    example: 'https://crests.football-data.org/63.png',
  })
  @IsString()
  awayLogoUrl: string;
}
