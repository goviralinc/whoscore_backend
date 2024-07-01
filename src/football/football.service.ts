import { Injectable, Logger } from '@nestjs/common';
import { LivescoreService } from 'src/third-party/livescore/livescore.service';
import {
  FixturesRequestDto,
  LivescoresRequestDto,
  MatchEventsRequestDto,
  MatchLineupsRequestDto,
  MatchStatsRequestDto,
  CompetitionsRequestDto,
  CountriesRequestDto,
  LivescoreResponseDto,
  FixturesResponseDto,
  MatchEventsResponseDto,
  MatchStatsResponseDto,
  MatchLineupResponseDto,
  CompetitionsResponseDto,
  CountryResponseDto,
  FederationsResponseDto,
} from './dto/football.dto';

@Injectable()
export class FootballService {
  private logger;

  constructor(private readonly livescoreService: LivescoreService) {
    this.logger = new Logger();
  }

  async getLiveScores(
    data: LivescoresRequestDto,
  ): Promise<LivescoreResponseDto> {
    const liveScores = await this.livescoreService.getLiveScores(data);
    const response: LivescoreResponseDto = {
      match: liveScores,
    };
    return response;
  }

  async getFixtures(data: FixturesRequestDto): Promise<FixturesResponseDto> {
    const response = await this.livescoreService.getFixtures(data);
    const fixtures: FixturesResponseDto = {
      fixtures: response.fixtures,
    };
    return fixtures;
  }

  async getMatchEvents(
    data: MatchEventsRequestDto,
  ): Promise<MatchEventsResponseDto> {
    const matchEvent: MatchEventsResponseDto =
      await this.livescoreService.getMatchEvents(data);
    return matchEvent;
  }

  async getMatchStats(
    data: MatchStatsRequestDto,
  ): Promise<MatchStatsResponseDto> {
    const matchStats: MatchStatsResponseDto =
      await this.livescoreService.getMatchStats(data);
    return matchStats;
  }

  async getMatchLineUps(data: MatchLineupsRequestDto) {
    const response = await this.livescoreService.getMatchLineups(data);
    const matchLineUps: MatchLineupResponseDto = response.lineup;
    return matchLineUps;
  }

  async getCountries(data: CountriesRequestDto): Promise<CountryResponseDto> {
    const response = await this.livescoreService.getCountries(data);
    const countries: CountryResponseDto = {
      countries: response.country,
    };

    return countries;
  }

  async getCompetitions(data: CompetitionsRequestDto) {
    const response = await this.livescoreService.getCompetitions(data);
    const competitions: CompetitionsResponseDto = {
      competitions: response.competitions,
    };
    return competitions;
  }

  async getFederations() {
    const response = await this.livescoreService.getFederations();
    const federations: FederationsResponseDto = {
      federations: response.federation,
    };

    return federations;
  }
}
