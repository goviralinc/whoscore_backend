import {
  Controller,
  Get,
  //Delete,
  //Param,
  //HttpCode,
  //HttpStatus,
  //HttpException,
  //Body,
  Query,
} from '@nestjs/common';
import { FootballService } from './football.service';
/**
 
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

import { CompetitionDto } from './dto/competition.dto';
import { FixtureMatchDto } from './dto/fixture.dto';
import { MatchDto } from './dto/match.dto';
import { CalendarDto } from './dto/response.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { MatchStatus } from 'src/utils/enums';
import { MatchDetailDto } from './dto/matchDetail.dto';
import { StandingsDto } from './dto/standings.dto';

@Controller('football')
@ApiTags('football')
export class FootballController {
  constructor(private readonly footballService: FootballService) {}

  @Get('competitions')
  @ApiOperation({ summary: 'Retrieve a list of football competitions' })
  @ApiResponse({
    status: 200,
    description: 'List of competitions retrieved successfully',
    type: [CompetitionDto],
  })
  async getCompetitions(): Promise<CompetitionDto[]> {
    const competitions = await this.footballService.getCompetitions();

    // Assuming that getCompetitions already returns an array of CompetitionDto
    return competitions;
  }

  @Get('calendar')
  @ApiOperation({
    summary: 'Retreive a list of competitions and their match fixtures',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Caledar Retreived successfully',
    type: [CalendarDto],
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Optional date filter in YYYY-MM-DD format',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Optional status filter',
  })
  async getCalendar(
    @Query('date') date?: string,
    @Query('status') status?: MatchStatus,
  ): Promise<CalendarDto[]> {
    const calendar = await this.footballService.getCalendar(date, status);

    return calendar;
  }

  @Get('competition-standings')
  @ApiOperation({
    summary:
      'Retreive all the stamding informations of a particular competition passing the ID',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Competition ID',
  })
  async getCompetitionStanding(@Query('id') id: number): Promise<StandingsDto> {
    return await this.footballService.getCompetitionStanding(id);
  }

  @Get('match-detail')
  @ApiOperation({
    summary:
      'Retreive all the informations of a particular match passing the match ID',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Match ID',
  })
  async getMatchDetails(@Query('id') id: number): Promise<MatchDetailDto> {
    return await this.footballService.getMatchdetails(id);
  }

  @Get('match-h2h')
  @ApiOperation({
    summary:
      'Retreive all the head to head informations of a particular match passing the match ID',
  })
  @ApiQuery({
    name: 'matchId',
    required: true,
    description: 'Match ID',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Match ID',
  })
  async getMatchH2H(
    @Query('matchId') matchId: number,
    @Query('limit') limit: number,
  ): Promise<MatchDetailDto> {
    return await this.footballService.getH2H(matchId, limit);
  }

  @Get('fixtures')
  @ApiOperation({ summary: 'Retrieve a list of football fixtures' })
  @ApiResponse({
    status: 200,
    description: 'List of fixtures retrieved successfully',
    type: [FixtureMatchDto],
  })
  @ApiQuery({
    name: 'competition',
    required: true,
    description: 'Competition code (e.g., PL for Premier League)',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Optional date filter in YYYY-MM-DD format',
  })
  async getFixtures(
    @Query('competition') competition: string,
    @Query('date') date?: string,
  ): Promise<FixtureMatchDto[]> {
    const fixtures = await this.footballService.getFixtures(competition, date);

    return fixtures;
  }

  @Get('livescores')
  @ApiOperation({ summary: 'Retrieve a list of football livescores' })
  @ApiResponse({
    status: 200,
    description: 'List of livescores retrieved successfully',
    type: [FixtureMatchDto],
  })
  @ApiQuery({
    name: 'competition',
    required: true,
    description: 'Competition code (e.g., PL for Premier League)',
  })
  async getLiveScores(
    @Query('competition') competition: string,
  ): Promise<MatchDto[]> {
    const livescores = await this.footballService.getLivescores(competition);

    return livescores;
  }
}
