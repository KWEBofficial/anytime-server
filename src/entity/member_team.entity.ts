import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import member from './member.entity';
import team from './team.entity';

@Entity()
export default class member_team {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => member)
  @JoinColumn()
  member!: member;

  @ManyToOne(() => team, (team: team) => team.members)
  team!: team;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isAdmin!: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isHide!: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isFavor!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
