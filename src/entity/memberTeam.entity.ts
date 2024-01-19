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

@Entity()
export default class MemberTeam {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Member, (member) => member.teams)
  member!: Member;

  @ManyToOne(() => Team, (team) => team.members)
  team!: Team;

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
