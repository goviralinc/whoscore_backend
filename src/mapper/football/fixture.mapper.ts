import { Injectable } from '@nestjs/common';
import { FixtureMatchDto } from 'src/football/dto/fixture.dto';

@Injectable()
export class FixtureMapper {
  mapToDto(data: any): FixtureMatchDto {
    const fixture = new FixtureMatchDto();
    fixture.id = data.id;
    fixture.competition = data.competition;
    fixture.status = data.status;
    fixture.date = data.utcDate;
    fixture.homeTeam = data.homeTeam;
    fixture.awayTeam = data.awayTeam;
    fixture.score = data.score;

    return fixture;
  }

  mapToDtoArray(data: any[]): FixtureMatchDto[] {
    return data.map((fixture) => this.mapToDto(fixture));
  }
}
