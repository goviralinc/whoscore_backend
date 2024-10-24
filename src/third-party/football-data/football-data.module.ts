import { Module } from '@nestjs/common';
import { FootballDataService } from './football-data.service';
import { FootballDataController } from './football-data.controller';
import { CompetitionMapper } from 'src/mapper/football/competition.mapper';
import { FixtureMapper } from 'src/mapper/football/fixture.mapper';
import { MatchMapper } from 'src/mapper/football/match.mapper';

@Module({
  controllers: [FootballDataController],
  providers: [FootballDataService, CompetitionMapper, FixtureMapper, MatchMapper],
  exports: [FootballDataService],
})
export class FootballDataModule {}
