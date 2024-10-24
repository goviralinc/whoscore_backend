import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivescoreModule } from './third-party/livescore/livescore.module';
import { FootballModule } from './football/football.module';
import { TicketIdModule } from './ticket-id/ticket-id.module';
import { FootballDataModule } from './third-party/football-data/football-data.module';
import typeorm from './utils/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    LivescoreModule,
    FootballModule,
    TicketIdModule,
    FootballDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
