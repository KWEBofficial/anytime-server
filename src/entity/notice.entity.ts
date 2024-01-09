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
import team from './team.entity';

@Entity()
export default class Notice {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => team)
  @JoinColumn()
  team!: team;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  content?: string;

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
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isPrior!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
