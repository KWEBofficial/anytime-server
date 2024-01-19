import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import MemberTeam from './memberTeam.entity';
import MemberSchedule from './memberSchedule.entity';
import Alarm from './alarm.entity';

@Entity()
export default class Member {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
    comment: '실명',
  })
  membername!: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    unique: true,
    comment: '사용자 이메일 주소',
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '인코딩된 비밀번호',
  })
  password!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => MemberTeam, (memberTeam) => memberTeam.member)
  teams!: MemberTeam[];

  @OneToMany(() => MemberSchedule, (memberSchedule) => memberSchedule.member)
  schedules!: MemberSchedule[];

  @OneToMany(() => Alarm, (alarm) => alarm.member)
  alarms!: Alarm[];
}
