import { Injectable } from "@nestjs/common";
import { MatchDto } from "src/football/dto/match.dto";

@Injectable()
export class MatchMapper {
    mapToDto(data: any): MatchDto {
        const fixture = new MatchDto();
        fixture.id = data.id;
        fixture.competition = data.competition;
        fixture.status = data.status;
        fixture.date = data.utcDate;
        fixture.homeTeam = data.homeTeam;
        fixture.awayTeam = data.awayTeam;

        return fixture;
    }

    mapToDtoArray(data: any[]): MatchDto[] {
        return data.map((fixture) => this.mapToDto(fixture));
    }
}