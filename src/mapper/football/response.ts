import { Injectable } from '@nestjs/common';
import { MatchTeamDto, MatchDto } from 'src/football/dto/response.dto';

@Injectable()
export class ResponseMapper {
  mapToMatchTeamDto(data: any): MatchTeamDto {
    const matchTeam = new MatchTeamDto();

    matchTeam.name = data.name;
    matchTeam.logo = data.crest;
    matchTeam.score = data.score ? data.score : 0;

    return matchTeam;
  }

  mapToMatchDto(data: any): MatchDto {
    const match = new MatchDto();

    match.id = data.id;
    match.team1 = this.mapToMatchTeamDto(data.homeTeam);
    match.team2 = this.mapToMatchTeamDto(data.awayTeam);
    match.date = data.utcDate;
    match.status = data.status;
    match.venue = data.venue;

    return match;
  }
}
