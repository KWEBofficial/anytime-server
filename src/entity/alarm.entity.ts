import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Member from './member.entity';
import Team from './team.entity';
import Schedule from './schedule.entity';

@Entity()
export default class Alarm {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Member, (member) => member.alarms)
  member!: Member;

  @ManyToOne(() => Team, (team) => team.alarms)
  team!: Team;

  @ManyToOne(() => Schedule, (schedule) => schedule.alarms)
  schedule!: Schedule;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isRead!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
