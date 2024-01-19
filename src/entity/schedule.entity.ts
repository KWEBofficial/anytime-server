import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Alarm from './alarm.entity';

@Entity()
export default class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  schedulename!: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  startTime!: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  endTime!: Date;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  explanation!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Alarm, (alarm) => alarm.schedule)
  alarms!: Alarm[];
}
