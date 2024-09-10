import { Entity, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';
import BaseModel from 'src/utils/base.model';

@Entity('bets')
export class Bet extends BaseModel {
  @Column({ type: 'text', nullable: true })
  oddType: string;

  @Column({ type: 'text', nullable: true })
  hometeam: string;

  @Column({ type: 'text', nullable: true })
  awayteam: string;

  @Column({ type: 'text', nullable: true })
  betType: string; // To handle cases like SportyBet's "betType"

  @Column({ type: 'text', nullable: true })
  time: string; // Unified time/date field

  @Column({ type: 'text', nullable: true })
  odds: string;

  @Column({ type: 'text', nullable: true })
  betStatus: string; // Standardized to handle status like "Won", "Lost", etc.

  @Column({ type: 'text', nullable: true })
  scores: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.bets)
  ticket: Ticket;
}
