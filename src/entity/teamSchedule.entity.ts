import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Schedule from './schedule.entity';
import Team from './team.entity';

@Entity()
export default class TeamSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team, (team) => team.schedules)
  team!: Team;

  @OneToOne(() => Schedule)
  @JoinColumn()
  schedule!: Schedule;
}
