import { Injectable, Logger } from '@nestjs/common';
import { LivescoreService } from 'src/third-party/livescore/livescore.service';
import { FootballDataService } from 'src/third-party/football-data/football-data.service';
import { groupMatchesByCompetition, getCompetitionCodesList } from './utils';
/*
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
 */
import {
  WebSocketGateway,
  WebSocketServer,
  //SubscribeMessage,
  //MessageBody,
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

  getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  async getCompetitions() {
    const competitions = await this.footballDataService.getCompetitions();

    return competitions;
  }

  async getCalendar(date?, status?) {
    const competitionsData = await this.getCompetitions();

    const competitionCodesList = getCompetitionCodesList(competitionsData);

    const response = await this.footballDataService.getMatches(
      competitionCodesList,
      date,
      status,
    );

    const calendarData = groupMatchesByCompetition(response);

    console.log(calendarData);
    return calendarData;
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

  async getMatchdetails(id) {
    const matchDetails = await this.footballDataService.getMatchdetail(id);

    return matchDetails;
  }

  async getH2H(matchId, limit?: number, competitions?: number[]) {
    const h2h = await this.footballDataService.getMatchH2h(
      matchId,
      limit,
      competitions,
    );

    return h2h.aggregates;
  }

  async getCompetitionStanding(id: number) {
    const response = await this.footballDataService.getCompetitionStandings(id);

    const standings = response.standings[0];

    return standings;
  }
}
