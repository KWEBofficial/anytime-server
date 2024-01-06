import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import member from './member.entity';
import schedule from './schedule.entity';

@Entity()
export default class MemberSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => member)
  @JoinColumn()
  member!: member;

  @OneToOne(() => schedule)
  @JoinColumn()
  schedule!: schedule;
}