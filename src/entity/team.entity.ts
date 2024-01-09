import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import MemberTeam from './memberTeam.entity';
import TeamSchedule from './teamSchedule.entity';
import Notice from './notice.entity';
import Alarm from './alarm.entity';

@Entity()
export default class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  teamname!: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  color!: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  explanation!: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isPublic!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => MemberTeam, (memberTeam) => memberTeam.team)
  members!: MemberTeam[];

  @OneToMany(() => TeamSchedule, (teamSchedule) => teamSchedule.team)
  schedules!: TeamSchedule[];

  @OneToMany(() => Notice, (notice) => notice.team)
  notices!: Notice[];

  @OneToMany(() => Alarm, (alarm) => alarm.team)
  alarms!: Alarm[];
}
