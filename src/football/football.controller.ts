import {
  Controller,
  Get,
  Post,
  //Delete,
  //Param,
  HttpCode,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { FootballService } from './football.service';
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
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('football')
@ApiTags('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Post('livescores')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LivescoreResponseDto })
  async getLiveScores(
    @Body() data: LivescoresRequestDto,
  ): Promise<LivescoreResponseDto> {
    try {
      return await this.footballService.getLiveScores(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('fixtures')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: FixturesResponseDto })
  async getFixtures(
    @Body() data: FixturesRequestDto,
  ): Promise<FixturesResponseDto> {
    try {
      return await this.footballService.getFixtures(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('match-events')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MatchEventsResponseDto })
  async getMatchEvents(
    @Body() data: MatchEventsRequestDto,
  ): Promise<MatchEventsResponseDto> {
    try {
      return await this.footballService.getMatchEvents(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('match-stats')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MatchStatsResponseDto })
  async getMatchStats(
    @Body() data: MatchStatsRequestDto,
  ): Promise<MatchStatsResponseDto> {
    try {
      return await this.footballService.getMatchStats(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('match-lineups')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MatchLineupResponseDto })
  async getMatchLineUps(
    @Body() data: MatchLineupsRequestDto,
  ): Promise<MatchLineupResponseDto> {
    try {
      return await this.footballService.getMatchLineUps(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('competitions')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CompetitionsResponseDto })
  async getCompetitions(
    @Body() data: CompetitionsRequestDto,
  ): Promise<CompetitionsResponseDto> {
    try {
      return await this.footballService.getCompetitions(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('countries')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CountryResponseDto })
  async getCountries(
    @Body() data: CountriesRequestDto,
  ): Promise<CountryResponseDto> {
    try {
      return await this.footballService.getCountries(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('federations')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: FederationsResponseDto })
  async getFederations(): Promise<FederationsResponseDto> {
    try {
      return await this.footballService.getFederations();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
