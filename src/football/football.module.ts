import { Module } from '@nestjs/common';
import { FootballService } from './football.service';
import { FootballController } from './football.controller';
import { LivescoreModule } from 'src/third-party/livescore/livescore.module';
import { LivescoreService } from 'src/third-party/livescore/livescore.service';
import { FootballDataModule } from 'src/third-party/football-data/football-data.module';

@Module({
  imports: [LivescoreModule, FootballDataModule],
  controllers: [FootballController],
  providers: [LivescoreService, FootballService],
})
export class FootballModule {}
