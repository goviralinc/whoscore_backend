import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Team {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  shortName: string;

  @IsString()
  tla: string;

  @IsString()
  crest: string;
}

class StandingEntry {
  @IsInt()
  position: number;

  @ValidateNested()
  @Type(() => Team)
  team: Team;

  @IsInt()
  playedGames: number;

  @IsInt()
  won: number;

  @IsInt()
  drawn: number;

  @IsInt()
  lost: number;

  @IsInt()
  goalsFor: number;

  @IsInt()
  goalsAgainst: number;

  @IsInt()
  goalDifference: number;

  @IsInt()
  points: number;
}

export class StandingsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StandingEntry)
  standings: StandingEntry[];
}
