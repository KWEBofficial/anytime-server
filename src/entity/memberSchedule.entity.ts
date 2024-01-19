import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Member from './member.entity';
import Schedule from './schedule.entity';

@Entity()
export default class MemberSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Member, (member) => member.schedules)
  member!: Member;

  @OneToOne(() => Schedule)
  @JoinColumn()
  schedule!: Schedule;
}
