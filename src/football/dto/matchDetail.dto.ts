import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// GoalDto
export class GoalDto {
  @ApiProperty({ description: 'The minute in which the goal was scored.' })
  @IsInt()
  minute: number;

  @ApiProperty({
    description: 'The injury time in which the goal was scored, if any.',
  })
  @IsOptional()
  @IsInt()
  injuryTime: number | null;

  @ApiProperty({ description: 'The type of the goal.' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The team that scored the goal.' })
  @ValidateNested()
  @Type(() => TeamDto)
  team: TeamDto;

  @ApiProperty({ description: 'The player who scored the goal.' })
  @ValidateNested()
  @Type(() => PlayerDto)
  scorer: PlayerDto;

  @ApiProperty({ description: 'The player who assisted the goal, if any.' })
  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerDto)
  assist: PlayerDto | null;

  @ApiProperty({ description: 'The score after the goal was scored.' })
  @ValidateNested()
  @Type(() => ScoreDto)
  score: ScoreDto;
}

// PlayerDto
export class PlayerDto {
  @ApiProperty({ description: 'The player ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The player name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The player position.' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'The player shirt number.' })
  @IsInt()
  shirtNumber: number;
}

// stats-package.dto.ts
export class StatsPackageDto {
  msg: string;
}

// TeamDto
export class TeamDto {
  @ApiProperty({ description: 'The team ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The team name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The short name of the team.' })
  @IsString()
  shortName: string;

  @ApiProperty({ description: 'The team three-letter abbreviation.' })
  @IsString()
  tla: string;

  @ApiProperty({ description: 'The URL of the team crest image.' })
  @IsString()
  crest: string;

  @ApiProperty({ description: 'Coach information of the team.' })
  @ValidateNested()
  @Type(() => CoachDto)
  coach: CoachDto;

  @ApiProperty({ description: 'The league rank of the team.' })
  @IsInt()
  leagueRank: number;

  @ApiProperty({ description: 'The team formation.' })
  @IsString()
  formation: string;

  @ApiProperty({ description: 'The lineup of players for the team.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  lineup: PlayerDto[];

  @ApiProperty({ description: 'The bench players for the team.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  bench: PlayerDto[];

  @ApiProperty({ description: 'Statistics information for the team.' })
  @ValidateNested()
  @Type(() => StatsPackageDto)
  statistics: StatsPackageDto;
}

// CoachDto
export class CoachDto {
  @ApiProperty({ description: 'The coach ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The name of the coach.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The nationality of the coach.' })
  @IsString()
  nationality: string;
}

// SubstitutionDto
export class SubstitutionDto {
  @ApiProperty({
    description: 'The minute at which the substitution took place.',
  })
  @IsInt()
  minute: number;

  @ApiProperty({ description: 'The team making the substitution.' })
  @ValidateNested()
  @Type(() => TeamDto)
  team: TeamDto;

  @ApiProperty({ description: 'The player substituted out.' })
  @ValidateNested()
  @Type(() => PlayerDto)
  playerOut: PlayerDto;

  @ApiProperty({ description: 'The player substituted in.' })
  @ValidateNested()
  @Type(() => PlayerDto)
  playerIn: PlayerDto;
}

// BookingDto
export class BookingDto {
  @ApiProperty({ description: 'The minute at which the booking was issued.' })
  @IsInt()
  minute: number;

  @ApiProperty({ description: 'The team of the booked player.' })
  @ValidateNested()
  @Type(() => TeamDto)
  team: TeamDto;

  @ApiProperty({ description: 'The player who received the booking.' })
  @ValidateNested()
  @Type(() => PlayerDto)
  player: PlayerDto;

  @ApiProperty({ description: 'The type of booking (YELLOW or RED).' })
  @IsString()
  card: string; // 'YELLOW' or 'RED'
}

// AreaDto
export class AreaDto {
  @ApiProperty({ description: 'The area ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The area name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The area code.' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'The area flag.' })
  @IsString()
  flag: string;
}

// CompetitionDto
export class CompetitionDto {
  @ApiProperty({ description: 'The competition ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The competition name.' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The competition code.' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'The type of competition.' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The competition emblem.' })
  @IsString()
  emblem: string;
}

// SeasonDto
export class SeasonDto {
  @ApiProperty({ description: 'The season ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The season start date.' })
  @IsString()
  startDate: string;

  @ApiProperty({ description: 'The season end date.' })
  @IsString()
  endDate: string;

  @ApiProperty({ description: 'The current matchday of the season.' })
  @IsInt()
  currentMatchday: number;

  @ApiProperty({ description: 'The winner of the season, if available.' })
  @IsOptional()
  @IsString()
  winner: string | null;

  @ApiProperty({ description: 'The stages of the season.' })
  @IsArray()
  stages: string[];
}

// ScoreDto
export class ScoreDto {
  @ApiProperty({ description: 'The winner of the match.' })
  @IsString()
  winner: string;

  @ApiProperty({ description: 'The match duration.' })
  @IsString()
  duration: string;

  @ApiProperty({ description: 'The full-time score.' })
  @ValidateNested()
  @Type(() => ScoreDetailDto)
  fullTime: ScoreDetailDto;

  @ApiProperty({ description: 'The half-time score.' })
  @ValidateNested()
  @Type(() => ScoreDetailDto)
  halfTime: ScoreDetailDto;
}

export class ScoreDetailDto {
  @ApiProperty({ description: 'The home team score.' })
  @IsInt()
  home: number;

  @ApiProperty({ description: 'The away team score.' })
  @IsInt()
  away: number;
}

// MatchDto
export class MatchDetailDto {
  @ApiProperty({ description: 'The area of the match.' })
  @ValidateNested()
  @Type(() => AreaDto)
  area: AreaDto;

  @ApiProperty({ description: 'The competition of the match.' })
  @ValidateNested()
  @Type(() => CompetitionDto)
  competition: CompetitionDto;

  @ApiProperty({ description: 'The season of the match.' })
  @ValidateNested()
  @Type(() => SeasonDto)
  season: SeasonDto;

  @ApiProperty({ description: 'The match ID.' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The UTC date of the match.' })
  @IsString()
  utcDate: string;

  @ApiProperty({ description: 'The status of the match.' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'The match minute.' })
  @IsInt()
  minute: number;

  @ApiProperty({ description: 'The injury time in the match.' })
  @IsInt()
  injuryTime: number;

  @ApiProperty({ description: 'The match attendance.' })
  @IsInt()
  attendance: number;

  @ApiProperty({ description: 'The venue of the match.' })
  @IsString()
  venue: string;

  @ApiProperty({ description: 'The matchday of the match.' })
  @IsInt()
  matchday: number;

  @ApiProperty({ description: 'The match stage.' })
  @IsString()
  stage: string;

  @ApiProperty({ description: 'The group of the match, if any.' })
  @IsOptional()
  @IsString()
  group: string | null;

  @ApiProperty({ description: 'The last updated date of the match.' })
  @IsString()
  lastUpdated: string;

  @ApiProperty({ description: 'The home team details.' })
  @ValidateNested()
  @Type(() => TeamDto)
  homeTeam: TeamDto;

  @ApiProperty({ description: 'The away team details.' })
  @ValidateNested()
  @Type(() => TeamDto)
  awayTeam: TeamDto;

  @ApiProperty({ description: 'The score details of the match.' })
  @ValidateNested()
  @Type(() => ScoreDto)
  score: ScoreDto;

  @ApiProperty({ description: 'The goals in the match.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoalDto)
  goals: GoalDto[];

  @ApiProperty({ description: 'The penalties, if any.' })
  @IsArray()
  penalties: any[];

  @ApiProperty({ description: 'The bookings in the match.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingDto)
  bookings: BookingDto[];

  @ApiProperty({ description: 'The substitutions in the match.' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubstitutionDto)
  substitutions: SubstitutionDto[];
}
