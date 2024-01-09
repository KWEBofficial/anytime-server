import {
  AllScheSearchResDTO,
  ScheduleDTO,
  TeamMemScheDTO,
} from '../type/schedule.dto';
import { InternalServerError } from '../util/customErrors';
import Member from '../entity/member.entity';
import Team from '../entity/team.entity';
import Schedule from '../entity/schedule.entity';
import MemberSchedule from '../entity/memberSchedule.entity';
import TeamSchedule from '../entity/teamSchedule.entity';

import ScheRepository from '../repository/schedule.repository';
import MemScheRepository from '../repository/memberSchedule.repository';
import TeamScheRepository from '../repository/teamSchedule.repository';
import MemTeamRepository from '../repository/memberTeam.repository';
import MemberRepository from '../repository/member.repository';
import TeamRepository from '../repository/team.repository';
import { AllScheSearch } from '../controller/schedule/controller';

export default class ScheService {
  static async ScheAdd(scheAddReq: ScheduleDTO): Promise<Schedule> {
    try {
      const schedule = await ScheRepository.save({
        schedulename: scheAddReq.name,
        startTime: scheAddReq.startTime,
        endTime: scheAddReq.endTime,
        explanation: scheAddReq.explanation,
      });
      return schedule;
    } catch (error) {
      throw new Error('ScheAdd Failure');
    }
  }

  static async ScheSave(schedule:Schedule): Promise<Schedule>{ 
    try{
      const resultsche = await ScheRepository.save(schedule);
      return resultsche;
    } catch (error) {
      throw new Error('ScheSave Failure');
    }
  }

  static async MemFindById(memberId: number): Promise<Member> {
    try {
      const member = await MemberRepository.findOne({
        where: { id: memberId },
      });
      if (member !== null) {
        return member;
      } else {
        throw new Error('member:null');
      }
    } catch (error) {
      throw new Error('member find failure');
    }
  }

  static async TeamFindById(teamId: number): Promise<Team> {
    try {
      const team = await TeamRepository.findOne({
        where: { id: teamId },
      });
      if (team !== null) {
        return team;
      } else {
        throw new Error('team:null');
      }
    } catch (error) {
      throw new Error('team find failure');
    }
  }

  static async ScheFindById(scheduleId: number): Promise<Schedule> {
    try {
      const schedule = await ScheRepository.findOne({
        where: { id: scheduleId },
      });
      if (schedule !== null) {
        return schedule;
      } else {
        throw new Error('schedule:null');
      }
    } catch (error) {
      throw new Error('schedule find failure');
    }
  }

  static async MemScheAdd(
    member: Member,
    schedule: Schedule,
  ): Promise<MemberSchedule> {
    try {
      const memSche = await MemScheRepository.save({
        Member: member,
        schedule: schedule,
      });
      return memSche;
    } catch (error) {
      throw new Error('Mem-ScheAdd Failure');
    }
  }

  static async TeamScheAdd(
    team: Team,
    schedule: Schedule,
  ): Promise<TeamSchedule> {
    try {
      const teamSche = await TeamScheRepository.save({
        Team: team,
        schedule: schedule,
      });
      return teamSche;
    } catch (error) {
      throw new Error('Team-ScheAdd Failure');
    }
  }

  static async AllScheFind(memberId: number): Promise<AllScheSearchResDTO> {
    try {
      const member = await ScheService.MemFindById(memberId);
      const team[] = await 
      const myScheduleIds = await MemScheRepository.find({
        where: { member: member },
      });
      const TeamScheduleIds = await TeamScheRepository.find({
        where: {team:},
      });
      const 
      const 
      return AllScheSearchRes
    } catch (error) {}
  }


}
