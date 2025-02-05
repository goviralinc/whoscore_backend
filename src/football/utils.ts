import { CompetitionDto } from './dto/competition.dto';
import { ResponseMapper } from 'src/mapper/football/response';

const responseMapper = new ResponseMapper();

export const groupMatchesByCompetition = (data) => {
  const groupedCompetitions = [];

  data.matches.forEach((match) => {
    const { competition } = match;
    if (!groupedCompetitions[competition.name]) {
      groupedCompetitions[competition.name] = {
        name: competition.name,
        logo: competition.emblem,
        matches: [],
      };
    }

    const formattedMatch = responseMapper.mapToMatchDto(match);

    groupedCompetitions[competition.name].matches.push(formattedMatch);
  });

  const formattedData = Object.values(groupedCompetitions);

  return formattedData;
};

export const getCompetitionCodesList = (competitions: CompetitionDto[]) => {
  const competitionsCodeList = [];

  competitions.forEach((competition) => {
    competitionsCodeList.push(competition.code);
  });

  return competitionsCodeList;
};
