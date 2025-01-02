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
}
