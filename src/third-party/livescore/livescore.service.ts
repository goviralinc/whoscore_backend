import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  LivescoresRequestDto,
  FixturesRequestDto,
  MatchEventsRequestDto,
  MatchStatsRequestDto,
  MatchLineupsRequestDto,
  CompetitionsRequestDto,
  CountriesRequestDto,
} from './dto/livescore.dto';

@Injectable()
export class LivescoreService {
  private baseUrl: string;
  private apiKey: string;
  private apiSecret: string;
  private logger;

  constructor(private readonly configureService: ConfigService) {
    this.baseUrl = this.configureService.get('LIVESCORE_BASE_URL');
    this.apiKey = this.configureService.get('LIVESCORE_API_KEY');
    this.apiSecret = this.configureService.get('LIVESCORE_API_SECRET');
    this.logger = new Logger();
  }

  async getLiveScores(data: LivescoresRequestDto) {
    let filters = ``;
    const competition_id = `${data.competition_id != undefined ? '&competition_id=' + data.competition_id : ''}`;
    const country_id = `${data.country_id != undefined ? '&country_id=' + data.country_id : ''}`;
    const fixture_id = `${data.fixture_id != undefined ? '&fixture_id=' + data.fixture_id : ''}`;
    const lang = `${data.lang != undefined ? '&lang=' + data.lang : ''}`;
    const team_id = `${data.team_id != undefined ? '&team_id=' + data.team_id : ''}`;

    filters = competition_id + country_id + fixture_id + lang + team_id;
    const url = `${this.baseUrl}/matches/live.json?&key=${this.apiKey}&secret=${this.apiSecret}${filters}`;

    try {
      const response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      const liveScores = responseData.data.match;
      return liveScores;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getFixtures(data: FixturesRequestDto) {
    let filters = ``;
    const competition_id = `${data.competition_id != undefined ? '&competition_id=' + data.competition_id : ''}`;
    const date = `${data.date != undefined ? '&date=' + data.date : ''}`;
    const lang = `${data.lang != undefined ? '&lang=' + data.lang : ''}`;
    const page = `${data.page != undefined ? '&page=' + data.page : ''}`;
    const round = `${data.round != undefined ? '&round=' + data.round : ''}`;
    const team_id = `${data.team != undefined ? '&team=' + data.team : ''}`;

    filters = competition_id + date + lang + page + round + team_id;
    const url = `${this.baseUrl}/fixtures/matches.json?&key=${this.apiKey}&secret=${this.apiSecret}${filters}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getMatchEvents(data: MatchEventsRequestDto) {
    let filters = ``;
    const lang = `${data.lang != undefined ? '&lang=' + data.lang : ''}`;
    filters = lang;
    const url = `${this.baseUrl}/scores/events.json?id=${data.id}&key=${this.apiKey}&secret=${this.apiSecret}${filters}`;

    try {
      const response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error(responseData.error);
      }
      const responseDto = {
        match: responseData.data.match,
        event: responseData.data.event,
      };
      return responseDto;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  async getMatchStats(data: MatchStatsRequestDto) {
    const url = `${this.baseUrl}/matches/stats.json?match_id=${data.id}&key=${this.apiKey}&secret=${this.apiSecret}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getMatchLineups(data: MatchLineupsRequestDto) {
    const url = `${this.baseUrl}/matches/lineups.json?match_id=${data.id}&key=${this.apiKey}&secret=${this.apiSecret}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCompetitions(data: CompetitionsRequestDto) {
    let filters = ``;
    const country_id = `${data.country_id != undefined ? '&country_id=' + data.country_id : ''}`;
    const federation_id = `${data.federation_id != undefined ? '&federation_id=' + data.federation_id : ''}`;
    filters = country_id + federation_id;

    const url = `${this.baseUrl}/competitions/list.json?&key=${this.apiKey}&secret=${this.apiSecret}${filters}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCountries(data: CountriesRequestDto) {
    let filters = ``;
    const federation_id = `${data.federation_id != undefined ? '&federation_id=' + data.federation_id : ''}`;
    filters = federation_id;

    const url = `${this.baseUrl}/countries/list.json?&key=${this.apiKey}&secret=${this.apiSecret}${filters}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getFederations() {
    const url = `${this.baseUrl}/federations/list.json?&key=${this.apiKey}&secret=${this.apiSecret}`;

    try {
      let response = await axios.get(url);
      const responseData = response.data;
      if (responseData.success != true) {
        throw new Error('The request was not successful for some reasons');
      }
      response = responseData.data;
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
