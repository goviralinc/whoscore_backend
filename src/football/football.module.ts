import { Module } from '@nestjs/common';
import { FootballService } from './football.service';
import { FootballController } from './football.controller';
import { LivescoreModule } from 'src/third-party/livescore/livescore.module';
import { LivescoreService } from 'src/third-party/livescore/livescore.service';

@Module({
  imports: [LivescoreModule],
  controllers: [FootballController],
  providers: [LivescoreService, FootballService],
})
export class FootballModule {}
