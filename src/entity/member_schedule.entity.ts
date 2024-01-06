import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinTable,
    JoinColumn
} from 'typeorm';
import member from "./member.entity";
import schedule from "./schedule.entity";

  @Entity()
  export default class member_schedule {
    @PrimaryGeneratedColumn()
    id!: number;

    /*@Column({
        type: 'int',
        nullable: false
    })
    memberId!: number;
*/

/*
    @ManyToOne(() => member, (member:member) => member.schedules)
    member!: member;
*/
    @OneToOne(() => member)
    @JoinColumn()
    member!: member;

    /*    
    @Column({
        type: 'int',
        nullable: false
    })
    scheduleId!: member;
*/
    @OneToOne(() => schedule)
    @JoinColumn()
    schedule!: schedule;

/*
    @ManyToOne(() => schedule, (schedule:schedule) => schedule.members)
    schedule!: member;
*/    
  }
