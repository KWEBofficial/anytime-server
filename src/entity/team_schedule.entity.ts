import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import team from './team.entity';
import schedule from './schedule.entity';

  @Entity()
  export default class team_schedule {
    @PrimaryGeneratedColumn()
    id!: number;
/*
    @Column({
        type: 'int',
        nullable: false
    })
    teamId!: number;
*/
    @ManyToOne(() => team, (team:team) => team.schedules)
    team!: team;
/*
    @Column({
        type: 'int',
        nullable: false
    })
    scheduleId!: number;
*/
    @OneToOne(() => schedule, (schedule:schedule) => schedule.teams)
    schedule!: schedule;
  }
//team_schedule과 member_schedule의 존재의의
//member_team은 그럴 수 있어. 한 사람이 여러 팀을 가질 수 있고 팀은 여러 사람을 가질 수 있어야 하니까
//근데 스케줄은 한 사람 꺼잖아. 애초에 스케줄 테이블에서 memberId column이 있으면?
//어차피 속도는 비슷한 거 아닌가?