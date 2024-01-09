import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import member from './member.entity';
import team from './team.entity';
import schedule from './schedule.entity';

@Entity()
export default class Alarm {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => member)
  @JoinColumn()
  member!: member;

  @OneToOne(() => team)
  @JoinColumn()
  team!: team;

  @OneToOne(() => schedule)
  @JoinColumn()
  schedule!: schedule;

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
  isRead!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
