import {
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import member from './member.entity';
import team from './team.entity';

  @Entity()
  export default class member_team {
    @PrimaryGeneratedColumn()
    id!: number;
/*
    @Column({
        type: 'int',
        nullable: false
    })
    memberId!: number;
*/

    @ManyToOne(() => member, (member:member) => member.teams)
    member!: member;
/*
    @Column({
        type: 'int',
        nullable: false
    })
    teamId!: number;
*/
    @ManyToOne(() => team, (team:team) => team.members)
    team!: team;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 0
    })
    isAdmin!: number;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 0
    })
    isHide!: number;
    
    @Column({
        type: 'tinyint',
        nullable: false,
        default: 0
    })
    isFavor!: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;

}