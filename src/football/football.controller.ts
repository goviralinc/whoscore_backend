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
  Query,
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
import { CompetitionDto } from './dto/competition.dto';
import { FixtureMatchDto } from './dto/fixture.dto';
import { MatchDto } from './dto/match.dto';
import { ApiTags, ApiOkResponse, ApiParam, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

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

  @Get('fixtures')
  @ApiOperation({ summary: 'Retrieve a list of football fixtures' })
  @ApiResponse({
    status: 200,
    description: 'List of fixtures retrieved successfully',
    type: [FixtureMatchDto],
  })
  @ApiQuery({ name: 'competition', required: true, description: 'Competition code (e.g., PL for Premier League)' })
  @ApiQuery({ name: 'date', required: false, description: 'Optional date filter in YYYY-MM-DD format' })
  async getFixtures(@Query('competition') competition: string, @Query('date') date?: string): Promise<FixtureMatchDto[]> {
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
  @ApiQuery({ name: 'competition', required: true, description: 'Competition code (e.g., PL for Premier League)' })
  async getLiveScores(@Query('competition') competition: string): Promise<MatchDto[]> {
    const livescores = await this.footballService.getLivescores(competition);

    return livescores;
  }
}
