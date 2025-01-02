import { Injectable, Logger } from '@nestjs/common';
import { LivescoreService } from 'src/third-party/livescore/livescore.service';
import { FootballDataService } from 'src/third-party/football-data/football-data.service';
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

  constructor(
    private readonly livescoreService: LivescoreService,
    private footballDataService: FootballDataService,
  ) {
    this.logger = new Logger();
  }

  /**
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
  */

  async getCompetitions() {
    const competitions = await this.footballDataService.getCompetitions();

    return competitions;
  }

  async getFixtures(competition, date) {
    const fixtures = await this.footballDataService.getFixtures(
      competition,
      date,
    );

    return fixtures;
  }

  async getLivescores(competition) {
    const livescores =
      await this.footballDataService.getLiveScores(competition);
    return livescores;
  }
}
