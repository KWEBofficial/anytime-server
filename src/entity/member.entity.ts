import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import member_schedule from './member_schedule.entity';
  import member_team from './member_team.entity';
  import alarm from './alarm.entity';
  @Entity()
  export default class member {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      type: 'varchar',
      length: 16,
      nullable: false,
      comment: '실명'
    })
    membername!: string; 
  
    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
        comment: '사용자 이메일 주소',
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        comment: '인코딩된 비밀번호'
    })
    password!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt?: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;



    
/*
    @OneToMany(() => member_schedule, (member_schedule:member_schedule) => member_schedule.member)
    schedules!: member_schedule[];

    @OneToMany(() => member_team, (member_team:member_team) => member_team.member)
    teams!: member_team[];

    @OneToMany(() => alarm, (alarm:alarm) => alarm.member)
    alarms!: alarm[];
*/
  }