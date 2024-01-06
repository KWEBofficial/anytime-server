import {
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import member_schedule from './member_schedule.entity';
import team_schedule from './team_schedule.entity';
import alarm from './alarm.entity';

  @Entity()
  export default class schedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false
    })
    schedulename!: string;
    
    @Column({
        type: 'timestamp',
        nullable: false
    })
    startTime!: Date;

    @Column({
        type: 'timestamp',
        nullable: false
    })
    endTime!: Date;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    explanation!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
/*
    @OneToMany(() => member_schedule, (member_schedule:member_schedule) => member_schedule.schedule)
    members!: member_schedule[];

    @OneToMany(() => team_schedule, (team_schedule:team_schedule) => team_schedule.schedule)
    teams!: team_schedule[];
    
    @OneToMany(() => alarm, (alarm:alarm) => alarm.schedule)
    alarms!: alarm[];
*/
}