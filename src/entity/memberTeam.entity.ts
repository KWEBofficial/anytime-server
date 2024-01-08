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

@Entity()
export default class MemberTeam {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => member)
  @JoinColumn()
  member!: member;

  @OneToOne(() => team)
  @JoinColumn()
  team!: team;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isAdmin!: boolean;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isHide!: boolean;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  isFavor!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
