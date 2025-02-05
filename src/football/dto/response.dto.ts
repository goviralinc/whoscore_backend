import { IsString, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from 'src/utils/enums';

export class MatchTeamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsNumber()
  score: number;
}

export class MatchDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  team1: MatchTeamDto;

  @ApiProperty()
  team2: MatchTeamDto;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @ApiProperty()
  @IsString()
  venue: string;
}

export class CalendarDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  matches: MatchDto[];
}
