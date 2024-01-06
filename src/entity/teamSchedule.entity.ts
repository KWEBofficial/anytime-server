import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import team from './team.entity';
import schedule from './schedule.entity';

@Entity()
export default class TeamSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => team)
  @JoinColumn()
  team!: team;

  @OneToOne(() => schedule)
  @JoinColumn()
  schedule!: schedule;
}
