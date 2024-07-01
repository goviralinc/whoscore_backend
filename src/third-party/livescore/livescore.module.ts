import { Module } from '@nestjs/common';
import { LivescoreService } from './livescore.service';
import { LivescoreController } from './livescore.controller';

@Module({
  controllers: [LivescoreController],
  providers: [LivescoreService],
})
export class LivescoreModule {}
