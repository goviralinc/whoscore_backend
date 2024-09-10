import { Entity, Column, OneToMany, Unique } from 'typeorm';
import BaseModel from 'src/utils/base.model';
import { Bet } from './bet.entity';

@Entity('tickets')
@Unique(['ticketId', 'betPlatform'])
export class Ticket extends BaseModel {
  @Column({ type: 'text' })
  ticketId: string;

  @Column({ type: 'text' })
  betPlatform: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  totalStake: string;

  @Column({ type: 'text' })
  totalOdds: string;

  @Column({ type: 'text', nullable: true })
  potentialWin: string;

  @Column({ type: 'text', nullable: true })
  grossWinnings: string; // BetKing-specific field

  @OneToMany(() => Bet, (bet) => bet.ticket, { cascade: true })
  bets: Bet[];
}
