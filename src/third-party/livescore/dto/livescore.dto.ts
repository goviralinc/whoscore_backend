export class LivescoresRequestDto {
  competition_id?: string;
  country_id?: number;
  fixture_id?: number;
  lang?: string;
  team_id?: number;
}

export class FixturesRequestDto {
  competition_id?: number;
  date?: string;
  lang?: string;
  page?: number;
  round?: string;
  team?: number;
}

export class MatchEventsRequestDto {
  id: number = 0;
  lang?: string;
}

export class MatchStatsRequestDto {
  id: number = 0;
}

export class MatchLineupsRequestDto {
  id: number = 0;
}

export class CompetitionsRequestDto {
  country_id?: number;
  federation_id?: number;
}

export class CountriesRequestDto {
  federation_id?: number;
}
