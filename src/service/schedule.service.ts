import {
  ScheResDTO,
  //AllScheSearchResDTO,
  ScheduleDTO,
  //TeamMemScheDTO,
} from '../type/schedule.dto';
//import { InternalServerError } from '../util/customErrors';
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

  static async ScheSave(schedule: Schedule): Promise<Schedule> {
    try {
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

  static async BelongTeamsFind(memberin: Member): Promise<Team[]> {
    try {
      const relations = await MemTeamRepository.find({
        where: { member: { id: memberin.id } },
        relations: ['team'],
      });
      const preteams = relations.map((t) => t.team);
      const teams = preteams.filter((t) => t !== null);
      if (teams !== undefined) {
        return teams;
      } else {
        throw new Error('belongteam:undefined');
      }
    } catch (error) {
      throw new Error('belongteamFind:Fail');
    }
  }

  static async ScheFindByMem(memberin: Member): Promise<Schedule[]> {
    try {
      const relations = await MemScheRepository.find({
        where: { member: { id: memberin.id } },
        relations: ['schedule'],
      });
      const preschedules = relations.map((t) => t.schedule);
      const schedules = preschedules.filter((t) => t !== null);
      if (schedules !== undefined) {
        return schedules;
      } else {
        throw new Error('schefindbymem:undefined');
      }
    } catch (error) {
      throw new Error('ScheFindByMem Failure');
    }
  }

  static async ScheFindByTeam(teamin: Team): Promise<Schedule[]> {
    try {
      const relations = await TeamScheRepository.find({
        where: { team: { id: teamin.id } },
        relations: ['schedule'],
      });
      const preschedules = relations.map((t) => t.schedule);
      const schedules = preschedules.filter((t) => t !== null);
      if (schedules !== undefined) {
        return schedules;
      } else {
        throw new Error('schefindby:teamundefined');
      }
    } catch (error) {
      throw new Error('ScheFindByTeam Failure');
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
    memberin: Member,
    schedulein: Schedule,
  ): Promise<MemberSchedule> {
    try {
      const memSche = await MemScheRepository.save({
        member: memberin,
        schedule: schedulein,
      });
      return memSche;
    } catch (error) {
      throw new Error('Mem-ScheAdd Failure');
    }
  }

  static async TeamScheAdd(
    teamin: Team,
    schedulein: Schedule,
  ): Promise<TeamSchedule> {
    try {
      const teamSche = await TeamScheRepository.save({
        team: teamin,
        schedule: schedulein,
      });
      return teamSche;
    } catch (error) {
      throw new Error('Team-ScheAdd Failure');
    }
  }

  static async TeamMemFind(teamId: number): Promise<Member[]> {
    try {
      const teamin = await ScheService.TeamFindById(teamId);
      const relations = await MemTeamRepository.find({
        where: { team: { id: teamin.id } },
        relations: ['member'],
      });
      const premembers = relations.map((t) => t.member);
      const members = premembers.filter((t) => t !== null);
      if (members !== undefined) {
        return members;
      } else {
        throw new Error('member:undefined');
      }
    } catch (error) {
      throw new Error('team-mem failure');
    }
  }

  static async MemToScheduleDTOs(memberin: Member): Promise<ScheduleDTO[]> {
    try {
      const ScheduleDTOs: ScheduleDTO[] = await Promise.all(
        (await ScheService.ScheFindByMem(memberin)).map(async (t) => {
          const map: ScheduleDTO = await ScheService.ScheToScheduleDTO(t);
          return map;
        }),
      );
      return ScheduleDTOs;
    } catch (error) {
      throw new Error('memtoschedto failure');
    }
  }

  static async TeamToScheduleDTOs(teamin: Team): Promise<ScheduleDTO[]> {
    try {
      const ScheduleDTOs: ScheduleDTO[] = await Promise.all(
        (await ScheService.ScheFindByTeam(teamin)).map(async (t) => {
          const map: ScheduleDTO = await ScheService.ScheToScheduleDTO(t);
          return map;
        }),
      );
      return ScheduleDTOs;
    } catch (error) {
      throw new Error('teamtoschedto failure');
    }
  }

  static async ScheToScheduleDTO(schedulein: Schedule): Promise<ScheduleDTO> {
    try {
      const scheduleDTO: ScheduleDTO = {
        name: schedulein.schedulename,
        startTime: schedulein.startTime,
        endTime: schedulein.endTime,
        explanation: schedulein.explanation,
      };
      return scheduleDTO;
    } catch (error) {
      throw new Error('schetoscheduledto failure');
    }
  }

  static async ScheToScheResDTO(schedulein: Schedule): Promise<ScheResDTO> {
    try {
      const scheResDTO: ScheResDTO = {
        startTime: schedulein.startTime,
        endTime: schedulein.endTime,
      };
      return scheResDTO;
    } catch (error) {
      throw new Error('schetoscheresdto failure');
    }
  }

  static async MemToScheResDTOs(memberin: Member): Promise<ScheResDTO[]> {
    try {
      const ownSchedule: Schedule[] = await ScheService.ScheFindByMem(memberin);
      const teams: Team[] = await ScheService.BelongTeamsFind(memberin);
      const eachTeamSchedule = await Promise.all(
        teams.map(async (t) => {
          const ateamsche: Schedule[] = await ScheService.ScheFindByTeam(t);
          return ateamsche;
        }),
      );
      const teamSchedule: Schedule[] = eachTeamSchedule.flat(1);
      const memSchedule: Schedule[] = ownSchedule.concat(teamSchedule);
      const ScheResDTOs: ScheResDTO[] = await Promise.all(
        memSchedule.map(async (t) => await ScheService.ScheToScheResDTO(t)),
      );
      return ScheResDTOs;
    } catch (error) {
      throw new Error('memtoscheresdtos failure');
    }
  }
  //static async ScheToScheResDTO(schedulein: Schedule): Promise<Schedule>

  /*static async MemSchedulesFind(members: Member[]): Promise<number[]> {
    const ownSche = await ScheService.;
  }
  /*static async AllScheFind(memberId: number): Promise<AllScheSearchResDTO> {
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
  }*/
}
