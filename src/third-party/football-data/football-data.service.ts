import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CompetitionMapper } from 'src/mapper/football/competition.mapper';
import { FixtureMapper } from 'src/mapper/football/fixture.mapper';
import { MatchMapper } from 'src/mapper/football/match.mapper';

@Injectable()
export class FootballDataService {
  private baseUrl;
  private apiKey;

  constructor(
    private configService: ConfigService,
    private competitionMapper: CompetitionMapper,
    private fixtureMapper: FixtureMapper,
    private matchMapper: MatchMapper,
  ) {
    this.baseUrl = this.configService.get('FOOTBALL_DATA_BASE_URL');
    this.apiKey = this.configService.get('FOOTBALL_DATA_API_KEY');
  }

  private async sendRequest(url) {
    const headers = {
      'X-Auth-Token': this.apiKey,
    };

    url = `${this.baseUrl}/${url}`;

    try {
      const response = await axios.get(url, {
        headers: headers,
      });

      return response.data;
    } catch (error) {
      console.error('Error making the API call:', error);
      return null;
    }
  }

  async getCompetitions() {
    const competionsUrl = `competitions/`;
    const response = await this.sendRequest(competionsUrl);
    const competitions = this.competitionMapper.mapToDtoArray(
      response.competitions,
    );

    return competitions;
  }

  async getCompetitionStandings(id: number) {
    const competionStandingUrl = `competitions/${id}/standings`;
    const response = await this.sendRequest(competionStandingUrl);

    return response;
  }

  async getLiveScores(competition: string) {
    let matchesUrl = `matches?status=IN_PLAY`;

    // If competition is provided, add it to the URL
    if (competition) {
      matchesUrl = `competitions/${competition}/matches?status=IN_PLAY`;
    }

    const response = await this.sendRequest(matchesUrl);
    const matches = response.matches;

    /**
        if (!response || !matches || matches.length < 1) {
            console.log({ message: 'No live matches found.' });
            return { message: 'No live matches found.' };
        }
        */

    const liveMatches = await this.matchMapper.mapToDtoArray(matches);
    return liveMatches;
  }

  async getMatchH2h(
    matchId,
    limit: number = null,
    competitions: number[] = null,
  ) {
    let matchUrl = `matches/${matchId}/head2head?`;

    if (competitions) {
      matchUrl += `&competitions=${competitions}`;
    }

    if (limit) {
      matchUrl += `&limit=${limit}`;
    }

    console.log(matchUrl);

    const response = await this.sendRequest(matchUrl);
    return response;
  }

  async getMatches(competitions: string[], date?, status?) {
    let matchesUrl = `matches/?`;
    const daysAfter = 7;
    let providedDate;

    status ? (matchesUrl += `status=${status}&`) : console.log('');
    date ? (providedDate = new Date(date)) : (providedDate = new Date());

    const dateFrom = providedDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    const endOfDay = new Date();
    endOfDay.setDate(providedDate.getDate() + daysAfter); // Add the number of days after today
    const dateTo = endOfDay.toISOString().split('T')[0]; // Date at the end of the specified day (YYYY-MM-DD)

    matchesUrl += `competitions=${competitions}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    const response = await this.sendRequest(matchesUrl);

    console.log(response);

    return response;
  }

  async getFixtures(competition: string, date: string) {
    let fixturesUrl = `competitions/${competition}/matches?`;

    // If a date is provided, convert it to dateFrom and dateTo
    if (date) {
      const providedDate = new Date(date);
      const dateFrom = providedDate.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Append dateFrom and dateTo to the URL
      fixturesUrl += `&dateFrom=${dateFrom}&dateTo=${dateFrom}`;
    }

    const response = await this.sendRequest(fixturesUrl);
    const matches = response.matches;

    /*
        if (!response || !matches || matches.length < 1) {
            return { message: 'No fixtures found for the given date.' };
        }
        */

    console.log(matches);

    const fixtures = this.fixtureMapper.mapToDtoArray(matches);

    return fixtures;
  }

  async getMatchdetail(matchId) {
    const matchUrl = `matches/${matchId}`;

    const response = await this.sendRequest(matchUrl);
    return response;
  }
}
