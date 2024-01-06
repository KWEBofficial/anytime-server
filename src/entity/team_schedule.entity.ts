import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import team from './team.entity';
import schedule from './schedule.entity';

@Entity()
export default class team_schedule {
  @PrimaryGeneratedColumn()
  id!: number;
  /*
    @Column({
        type: 'int',
        nullable: false
    })
    teamId!: number;
*/
  @ManyToOne(() => team, (team: team) => team.schedules)
  team!: team;
  /*
    @Column({
        type: 'int',
        nullable: false
    })
    scheduleId!: number;
*/
  @OneToOne(() => schedule, (schedule: schedule) => schedule.teams)
  schedule!: schedule;
}
