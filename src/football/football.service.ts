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
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FootballService {
  @WebSocketServer()
  server: Server;

  private logger;

  constructor(private readonly livescoreService: LivescoreService) {
    this.logger = new Logger();
  }

  @SubscribeMessage('getLiveScores')
  async getLiveScores(
    @MessageBody() data: LivescoresRequestDto,
  ): Promise<LivescoreResponseDto> {
    const liveScores = await this.livescoreService.getLiveScores(data);
    const response: LivescoreResponseDto = {
      match: liveScores,
    };
    this.server.emit('liveScores', response);
    return response;
  }

  @SubscribeMessage('getFixtures')
  async getFixtures(
    @MessageBody() data: FixturesRequestDto,
  ): Promise<FixturesResponseDto> {
    const response = await this.livescoreService.getFixtures(data);
    const fixtures: FixturesResponseDto = {
      fixtures: response.fixtures,
    };
    this.server.emit('fixtures', fixtures);
    return fixtures;
  }

  @SubscribeMessage('getMatchEvents')
  async getMatchEvents(
    @MessageBody() data: MatchEventsRequestDto,
  ): Promise<MatchEventsResponseDto> {
    const matchEvents: MatchEventsResponseDto =
      await this.livescoreService.getMatchEvents(data);
    this.server.emit('matchEvents', matchEvents);
    return matchEvents;
  }

  @SubscribeMessage('getMatchStats')
  async getMatchStats(
    @MessageBody() data: MatchStatsRequestDto,
  ): Promise<MatchStatsResponseDto> {
    const matchStats: MatchStatsResponseDto =
      await this.livescoreService.getMatchStats(data);
    this.server.emit('matchStats', matchStats);
    return matchStats;
  }

  @SubscribeMessage('getMatchLineUps')
  async getMatchLineUps(
    @MessageBody() data: MatchLineupsRequestDto,
  ): Promise<MatchLineupResponseDto> {
    const response = await this.livescoreService.getMatchLineups(data);
    const matchLineUps: MatchLineupResponseDto = response.lineup;
    this.server.emit('matchLineUps', matchLineUps);
    return matchLineUps;
  }

  @SubscribeMessage('getCountries')
  async getCountries(
    @MessageBody() data: CountriesRequestDto,
  ): Promise<CountryResponseDto> {
    const countries: CountryResponseDto = {
      countries: await this.livescoreService.getCountries(data),
    };
    this.server.emit('countries', countries);
    return countries;
  }

  @SubscribeMessage('getCompetitions')
  async getCompetitions(
    @MessageBody() data: CompetitionsRequestDto,
  ): Promise<CompetitionsResponseDto> {
    const competitions: CompetitionsResponseDto = {
      competitions: await this.livescoreService.getCompetitions(data),
    };
    this.server.emit('competitions', competitions);
    return competitions;
  }

  @SubscribeMessage('getFederations')
  async getFederations(): Promise<FederationsResponseDto> {
    const federations: FederationsResponseDto = {
      federations: await this.livescoreService.getFederations(),
    };
    this.server.emit('federations', federations);
    return federations;
  }
}
