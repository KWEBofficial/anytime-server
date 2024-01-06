import {
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import member_team from './member_team.entity';
import team_schedule from './team_schedule.entity';
import notice from './notice.entity';
import alarm from './alarm.entity';
  @Entity()
  export default class team {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false
    })
    teamname!: string;

    @Column({
        type: 'int',
        nullable: false
    })
    color!: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    explanation!: string;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 0
    })
    isPublic!: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
/*
    @OneToMany(() => member_team, (member_team:member_team) => member_team.team)
    members!: member_team[];

    @OneToMany(() => team_schedule, (team_schedule:team_schedule) => team_schedule.team)
    schedules!: team_schedule[];

    @OneToMany(() => notice, (notice:notice) => notice.team)
    notices!: notice[];

    @OneToMany(() => alarm, (alarm:alarm) => alarm.team)
    alarms!: alarm[];
*/
}