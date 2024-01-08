import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Team from './team.entity';

@Entity()
export default class Notice {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Team, (team) => team.notices)
  team!: Team;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  startDate?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  endDate?: Date;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isPrior!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
