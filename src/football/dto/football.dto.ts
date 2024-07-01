import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsObject,
  ValidateNested,
  IsArray,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LivescoreCountryDto {
  @ApiProperty({ description: 'Indicates if the country is real' })
  @IsBoolean()
  is_real: boolean;

  @ApiProperty({ description: 'The ID of the country' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'The UEFA code of the country', required: false })
  @IsString()
  @IsOptional()
  uefa_code: string;

  @ApiProperty({ description: 'The name of the country' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The FIFA code of the country' })
  @IsString()
  fifa_code: string;

  @ApiProperty({ description: 'The flag of the country' })
  @IsString()
  flag: string;
}

export class LivescoreTeamDto {
  @ApiProperty({ description: 'The stadium of the team' })
  @IsString()
  stadium: string;

  @ApiProperty({ description: 'The ID of the team' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'The logo of the team' })
  @IsString()
  logo: string;

  @ApiProperty({ description: 'The name of the team' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The country ID of the team' })
  @IsString()
  country_id: string;
}

export class LivescoreCompetitionDto {
  @ApiProperty({ description: 'The tier of the competition' })
  @IsNumber()
  tier: number;

  @ApiProperty({ description: 'Indicates if the competition is a cup' })
  @IsBoolean()
  is_cup: boolean;

  @ApiProperty({ description: 'Indicates if the competition has groups' })
  @IsBoolean()
  has_groups: boolean;

  @ApiProperty({ description: 'The ID of the competition' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Indicates if the competition is active' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'The name of the competition' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Indicates if the competition is a league' })
  @IsBoolean()
  is_league: boolean;

  @ApiProperty({
    description: 'Indicates if the competition is for national teams only',
  })
  @IsBoolean()
  national_teams_only: boolean;
}

export class OddsDto {
  @ApiProperty({ description: 'Live odds for the match' })
  @IsObject()
  live: {
    1: number;
    2: number;
    X: number;
  };

  @ApiProperty({ description: 'Pre-match odds for the match' })
  @IsObject()
  pre: {
    1: number;
    2: number;
    X: number;
  };
}

export class OutcomesDto {
  @ApiProperty({
    description: 'Half-time outcome of the match',
    required: false,
  })
  @IsOptional()
  @IsString()
  half_time: string | null = null;

  @ApiProperty({
    description: 'Full-time outcome of the match',
    required: false,
  })
  @IsOptional()
  @IsString()
  full_time: string | null = null;

  @ApiProperty({
    description: 'Extra-time outcome of the match',
    required: false,
  })
  @IsOptional()
  @IsString()
  extra_time: string | null = null;

  @ApiProperty({
    description: 'Penalty shootout outcome of the match',
    required: false,
  })
  @IsOptional()
  @IsString()
  penalty_shootout: string | null = null;
}

export class ScoresDto {
  @ApiProperty({ description: 'The current score of the match' })
  @IsString()
  score: string;

  @ApiProperty({ description: 'The half-time score of the match' })
  @IsString()
  ht_score: string;

  @ApiProperty({ description: 'The full-time score of the match' })
  @IsString()
  ft_score: string;

  @ApiProperty({ description: 'The extra-time score of the match' })
  @IsString()
  et_score: string;

  @ApiProperty({ description: 'The penalty shootout score of the match' })
  @IsString()
  ps_score: string;
}

export class UrlsDto {
  @ApiProperty({ description: 'URL for match events' })
  @IsString()
  events: string;

  @ApiProperty({ description: 'URL for match statistics' })
  @IsString()
  statistics: string;

  @ApiProperty({ description: 'URL for match lineups' })
  @IsString()
  lineups: string;

  @ApiProperty({ description: 'URL for head-to-head information' })
  @IsString()
  head2head: string;
}

export class LivescoreMatchDto {
  @ApiProperty({ type: LivescoreCountryDto })
  @ValidateNested()
  @Type(() => LivescoreCountryDto)
  country: LivescoreCountryDto;

  @ApiProperty({ description: 'The last changed date of the match data' })
  @IsString()
  last_changed: string;

  @ApiProperty({ type: LivescoreTeamDto })
  @ValidateNested()
  @Type(() => LivescoreTeamDto)
  home: LivescoreTeamDto;

  @ApiProperty({ description: 'The added date of the match data' })
  @IsString()
  added: string;

  @ApiProperty({ description: 'The current status of the match' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'The federation of the match', required: false })
  @IsOptional()
  @IsString()
  federation: string | null = null;

  @ApiProperty({ description: 'The location of the match' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'The scheduled time of the match' })
  @IsString()
  scheduled: string;

  @ApiProperty({ type: LivescoreCompetitionDto })
  @ValidateNested()
  @Type(() => LivescoreCompetitionDto)
  competition: LivescoreCompetitionDto;

  @ApiProperty({ description: 'The ID of the match' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'The current time of the match' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'The fixture ID of the match' })
  @IsNumber()
  fixture_id: number;

  @ApiProperty({ type: OddsDto })
  @ValidateNested()
  @Type(() => OddsDto)
  odds: OddsDto;

  @ApiProperty({ type: LivescoreTeamDto })
  @ValidateNested()
  @Type(() => LivescoreTeamDto)
  away: LivescoreTeamDto;

  @ApiProperty({ type: OutcomesDto })
  @ValidateNested()
  @Type(() => OutcomesDto)
  outcomes: OutcomesDto;

  @ApiProperty({ type: ScoresDto })
  @ValidateNested()
  @Type(() => ScoresDto)
  scores: ScoresDto;

  @ApiProperty({ type: UrlsDto })
  @ValidateNested()
  @Type(() => UrlsDto)
  urls: UrlsDto;
}

export class TeamTranslationDto {
  @ApiProperty({ description: 'Dutch translation' })
  @IsString()
  nl: string;

  @ApiProperty({ description: 'Norwegian translation' })
  @IsString()
  no: string;

  @ApiProperty({ description: 'Romanian translation' })
  @IsString()
  ro: string;

  @ApiProperty({ description: 'Georgian translation' })
  @IsString()
  ka: string;

  @ApiProperty({ description: 'Korean translation' })
  @IsString()
  ko: string;

  @ApiProperty({ description: 'Arabic translation' })
  @IsString()
  ar: string;

  @ApiProperty({ description: 'French translation' })
  @IsString()
  fr: string;

  @ApiProperty({ description: 'Greek translation' })
  @IsString()
  el: string;

  @ApiProperty({ description: 'Turkish translation' })
  @IsString()
  tr: string;

  @ApiProperty({ description: 'Danish translation' })
  @IsString()
  da: string;

  @ApiProperty({ description: 'Slovak translation' })
  @IsString()
  sk: string;

  @ApiProperty({ description: 'Serbian translation' })
  @IsString()
  sr: string;

  @ApiProperty({ description: 'Chinese translation' })
  @IsString()
  zh: string;

  @ApiProperty({ description: 'Swedish translation' })
  @IsString()
  sv: string;

  @ApiProperty({ description: 'Estonian translation' })
  @IsString()
  et: string;

  @ApiProperty({ description: 'Bulgarian translation' })
  @IsString()
  bg: string;

  @ApiProperty({ description: 'Czech translation' })
  @IsString()
  cs: string;

  @ApiProperty({ description: 'German translation' })
  @IsString()
  de: string;

  @ApiProperty({ description: 'Croatian translation' })
  @IsString()
  hr: string;

  @ApiProperty({ description: 'Thai translation' })
  @IsString()
  th: string;

  @ApiProperty({ description: 'Hungarian translation' })
  @IsString()
  hu: string;

  @ApiProperty({ description: 'Spanish translation' })
  @IsString()
  es: string;

  @ApiProperty({ description: 'Polish translation' })
  @IsString()
  pl: string;

  @ApiProperty({ description: 'Persian translation' })
  @IsString()
  fa: string;

  @ApiProperty({ description: 'Vietnamese translation' })
  @IsString()
  vi: string;

  @ApiProperty({ description: 'Russian translation' })
  @IsString()
  ru: string;

  @ApiProperty({ description: 'Japanese translation' })
  @IsString()
  ja: string;

  @ApiProperty({ description: 'Italian translation' })
  @IsString()
  it: string;

  @ApiProperty({ description: 'Portuguese translation' })
  @IsString()
  pt: string;

  @ApiProperty({ description: 'Lithuanian translation' })
  @IsString()
  lt: string;

  @ApiProperty({ description: 'Finnish translation' })
  @IsString()
  fi: string;
}

export class LeagueDto {
  @ApiProperty({ description: 'Name of the league', required: false })
  @IsOptional()
  @IsString()
  name: string | null = null;

  @ApiProperty({ description: 'Country ID of the league', required: false })
  @IsOptional()
  @IsNumber()
  country_id: number | null = null;

  @ApiProperty({ description: 'ID of the league', required: false })
  @IsOptional()
  @IsNumber()
  id: number | null = null;
}

export class SmallCompetitionDto {
  @ApiProperty({ description: 'Name of the competition' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID of the competition' })
  @IsNumber()
  id: number;
}

export class FixtureDto {
  @ApiProperty({ type: SmallCompetitionDto })
  @ValidateNested()
  @Type(() => SmallCompetitionDto)
  competition: SmallCompetitionDto;

  @ApiProperty({ description: 'Home team ID' })
  @IsNumber()
  home_id: number;

  @ApiProperty({ description: 'Home team name' })
  @IsString()
  home_name: string;

  @ApiProperty({ description: 'Fixture ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Location of the match' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Round of the competition' })
  @IsString()
  round: string;

  @ApiProperty({ description: 'Group ID' })
  @IsNumber()
  group_id: number;

  @ApiProperty({ description: 'Date of the match' })
  @IsString()
  date: string;

  @ApiProperty({ description: 'Away team ID' })
  @IsNumber()
  away_id: number;

  @ApiProperty({ type: LeagueDto })
  @ValidateNested()
  @Type(() => LeagueDto)
  league: LeagueDto;

  @ApiProperty({ description: 'League ID' })
  @IsNumber()
  league_id: number;

  @ApiProperty({ type: TeamTranslationDto })
  @ValidateNested()
  @Type(() => TeamTranslationDto)
  home_translations: TeamTranslationDto;

  @ApiProperty({ type: OddsDto })
  @ValidateNested()
  @Type(() => OddsDto)
  odds: OddsDto;

  @ApiProperty({ description: 'Competition ID' })
  @IsNumber()
  competition_id: number;

  @ApiProperty({ description: 'Time of the match' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'Away team name' })
  @IsString()
  away_name: string;

  @ApiProperty({ type: TeamTranslationDto })
  @ValidateNested()
  @Type(() => TeamTranslationDto)
  away_translations: TeamTranslationDto;

  @ApiProperty({ description: 'Head to head URL' })
  @IsString()
  h2h: string;
}

export class EventDto {
  @ApiProperty({ description: 'Event ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Match ID' })
  @IsString()
  match_id: string;

  @ApiProperty({ description: 'Player name' })
  @IsString()
  player: string;

  @ApiProperty({ description: 'Event time' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'Event type' })
  @IsString()
  event: string;

  @ApiProperty({ description: 'Sort order of the event' })
  @IsString()
  sort: string;

  @ApiProperty({ description: 'Home or Away team indicator' })
  @IsString()
  home_away: string;
}

export class EventTeamDto {
  @ApiProperty({ description: 'Team ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Team name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Team stadium' })
  @IsString()
  stadium: string;

  @ApiProperty({ description: 'Team location' })
  @IsString()
  location: string;
}

export class EventMatchDto {
  @ApiProperty({ description: 'Match ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Match date' })
  @IsString()
  date: string;

  @ApiProperty({ description: 'Home team name' })
  @IsString()
  home_name: string;

  @ApiProperty({ description: 'Away team name' })
  @IsString()
  away_name: string;

  @ApiProperty({ description: 'Match score' })
  @IsString()
  score: string;

  @ApiProperty({ description: 'Half-time score' })
  @IsString()
  ht_score: string;

  @ApiProperty({ description: 'Full-time score' })
  @IsString()
  ft_score: string;

  @ApiProperty({ description: 'Extra-time score', required: false })
  @IsOptional()
  @IsString()
  et_score: string | null;

  @ApiProperty({ description: 'Match time' })
  @IsString()
  time: string;

  @ApiProperty({ description: 'League ID' })
  @IsString()
  league_id: string;

  @ApiProperty({ description: 'Match status' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Added timestamp' })
  @IsString()
  added: string;

  @ApiProperty({ description: 'Last changed timestamp' })
  @IsString()
  last_changed: string;

  @ApiProperty({ description: 'Home team ID' })
  @IsString()
  home_id: string;

  @ApiProperty({ description: 'Away team ID' })
  @IsString()
  away_id: string;

  @ApiProperty({ description: 'Competition ID' })
  @IsString()
  competition_id: string;

  @ApiProperty({ description: 'Match location', required: false })
  @IsOptional()
  @IsString()
  location: string | null;

  @ApiProperty({ description: 'Fixture ID', required: false })
  @IsOptional()
  @IsString()
  fixture_id: string | null;

  @ApiProperty({ description: 'Scheduled time', required: false })
  @IsOptional()
  @IsString()
  scheduled: string | null;

  @ApiProperty({ type: EventTeamDto })
  @ValidateNested()
  @Type(() => EventTeamDto)
  home: EventTeamDto;

  @ApiProperty({ type: EventTeamDto })
  @ValidateNested()
  @Type(() => EventTeamDto)
  away: EventTeamDto;

  @ApiProperty({ type: SmallCompetitionDto })
  @ValidateNested()
  @Type(() => SmallCompetitionDto)
  competition: SmallCompetitionDto;
}

class LineupTeamDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  stadium: string;

  @ApiProperty()
  @IsString()
  location: string;
}

class PlayerDto {
  @ApiProperty()
  @IsString()
  team_id: string;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  substitution: string;

  @ApiProperty()
  @IsString()
  shirt_number: string;
}

class FederationDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;
}

class SeasonDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  start: string;

  @ApiProperty()
  @IsString()
  end: string;
}

class CompetitionCountryDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  flag: string;

  @ApiProperty()
  @IsString()
  fifa_code: string;

  @ApiProperty()
  @IsString()
  uefa_code: string;

  @ApiProperty()
  @IsString()
  is_real: string;
}

class CompetitionDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  is_league: string;

  @ApiProperty()
  @IsString()
  is_cup: string;

  @ApiProperty()
  @IsString()
  tier: string;

  @ApiProperty()
  @IsString()
  has_groups: string;

  @ApiProperty()
  @IsString()
  active: string;

  @ApiProperty()
  @IsString()
  national_teams_only: string;

  @ApiProperty({ type: [CompetitionCountryDto] })
  @ValidateNested({ each: true })
  @Type(() => CompetitionCountryDto)
  @IsArray()
  @IsOptional()
  countries: CompetitionCountryDto[];

  @ApiProperty({ type: [FederationDto] })
  @ValidateNested({ each: true })
  @Type(() => FederationDto)
  @IsArray()
  @IsOptional()
  federations: FederationDto[];

  @ApiProperty({ type: SeasonDto })
  @ValidateNested()
  @Type(() => SeasonDto)
  season: SeasonDto;
}

class NationalTeamDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  stadium: string;

  @ApiProperty()
  @IsString()
  location: string;
}

class CountryDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  is_real: string;

  @ApiProperty()
  @IsString()
  leagues: string;

  @ApiProperty()
  @IsString()
  scores: string;

  @ApiProperty({ type: NationalTeamDto, nullable: true })
  @ValidateNested()
  @Type(() => NationalTeamDto)
  @IsOptional()
  national_team?: NationalTeamDto;

  @ApiProperty({ type: FederationDto })
  @ValidateNested()
  @Type(() => FederationDto)
  federation: FederationDto;
}

export class FederationsResponseDto {
  @ApiProperty({ type: [FederationDto] })
  @ValidateNested({ each: true })
  @Type(() => FederationDto)
  @IsArray()
  federations: FederationDto[];
}

export class CountryResponseDto {
  @ApiProperty({ type: [CountryDto] })
  @ValidateNested({ each: true })
  @Type(() => CountryDto)
  @IsArray()
  countries: CountryDto[];
}

export class CompetitionsResponseDto {
  @ApiProperty({ type: [CompetitionDto] })
  @ValidateNested({ each: true })
  @Type(() => CompetitionDto)
  @IsArray()
  competitions: CompetitionDto[];
}

export class MatchLineupResponseDto {
  @ApiProperty({ type: LineupTeamDto })
  @ValidateNested()
  @Type(() => LineupTeamDto)
  home: LineupTeamDto;

  @ApiProperty({ type: [PlayerDto] })
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  home_players: PlayerDto[];

  @ApiProperty({ type: LineupTeamDto })
  @ValidateNested()
  @Type(() => LineupTeamDto)
  away: LineupTeamDto;

  @ApiProperty({ type: [PlayerDto] })
  @ValidateNested({ each: true })
  @Type(() => PlayerDto)
  away_players: PlayerDto[];
}

export class MatchStatsResponseDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  yellow_cards: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  red_cards: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  substitutions: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  possesion: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  free_kicks: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  goal_kicks: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  throw_ins: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  offsides: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  corners: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  shots_on_target: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  shots_off_target: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  attempts_on_goal: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  saves: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  fauls: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  treatments: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  penalties: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  shots_blocked: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  dangerous_attacks: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d+:\d+$/)
  attacks: string;
}

export class MatchEventsResponseDto {
  @ApiProperty({ type: [EventDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  event: EventDto[];

  @ApiProperty({ type: EventMatchDto })
  @ValidateNested()
  @Type(() => EventMatchDto)
  match: EventMatchDto;
}

export class FixturesResponseDto {
  @ApiProperty({ type: [FixtureDto] })
  @ValidateNested({ each: true })
  @Type(() => FixtureDto)
  fixtures: FixtureDto[];
}

export class LivescoreResponseDto {
  @ApiProperty({ type: [LivescoreMatchDto] })
  @ValidateNested({ each: true })
  @Type(() => LivescoreMatchDto)
  match: LivescoreMatchDto[];
}

export class LivescoresRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  competition_id?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  country_id?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  fixture_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lang?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  team_id?: number;
}

export class FixturesRequestDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  competition_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lang?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  round?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  team?: number;
}

export class MatchEventsRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lang?: string;
}

export class MatchStatsRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class MatchLineupsRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class CompetitionsRequestDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  country_id?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  federation_id?: number;
}

export class CountriesRequestDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  federation_id?: number;
}
