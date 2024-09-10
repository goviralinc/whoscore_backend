import { CreateTicketDto } from 'src/ticket-id/dto/create-ticket.dto';
import { CreateBetDto } from 'src/ticket-id/dto/bet.dto';
import { TicketDto } from 'src/ticket-id/dto/ticket.dto';

export class TicketMapper {
    toCreateTicketDto(data: any, ticketId: string, betPlatform: string): CreateTicketDto {
        const bets: CreateBetDto[] = data.bets.map((bet: any) => {
            return {
                date: bet.date,
                oddType: bet.oddType,
                type: bet.type,
                time: bet.time,
                hometeam: bet.hometeam,
                awayteam: bet.awayteam,
                odds: bet.odds,
                bet_status: bet.bet_status || null,  // Optional field
                scores: bet.scores || null,  // Optional field
            };
        });

        const createTicketDto: CreateTicketDto = {
            ticketId,
            betPlatform,
            type: data.info.type,
            totalStake: data.info.totalStake,
            totalOdds: data.info.totalOdds,
            potentialWin: data.info.potentialWin,
            bets,
        };

        return createTicketDto;
    }

    mapTicketDataToSimplifiedFormat(ticketData: TicketDto): any {
        const { bets, type, totalStake, totalOdds, potentialWin } = ticketData;
      
        const simplifiedBets = bets.map((bet: any) => {
          return {
            date: bet.date,
            oddType: bet.oddType,
            type: bet.type,
            time: bet.time,
            hometeam: bet.hometeam,
            awayteam: bet.awayteam,
            odds: bet.odds,
            bet_status: bet.bet_status,
            scores: bet.scores,
          };
        });
      
        return {
          status: "success",
          data: {
            bets: simplifiedBets,
            info: {
              type: type,
              totalStake: totalStake,
              totalOdds: totalOdds,
              potentialWin: potentialWin,
            },
          },
        };
      }
}
