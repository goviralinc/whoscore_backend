import { Injectable } from '@nestjs/common';
import { CompetitionDto } from 'src/football/dto/competition.dto';

@Injectable()
export class CompetitionMapper {
  mapToDto(data: any): CompetitionDto {
    const competition = new CompetitionDto();
    competition.id = data.id;
    competition.code = data.code;
    competition.name = data.name;
    competition.type = data.type;
    competition.emblem = data.emblem;

    return competition;
  }

  mapToDtoArray(data: any[]): CompetitionDto[] {
    return data.map((competition) => this.mapToDto(competition));
  }
}
