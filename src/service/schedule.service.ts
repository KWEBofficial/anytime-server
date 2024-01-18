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
import ScheduleRepository from '../repository/schedule.repository';
import MemberScheduleRepository from '../repository/memberSchedule.repository';
import TeamScheduleRepository from '../repository/teamSchedule.repository';
import MemberTeamRepository from '../repository/memberTeam.repository';
import MemberRepository from '../repository/member.repository';
import TeamRepository from '../repository/team.repository';
import { BadRequestError, InternalServerError } from '../util/customErrors';

export default class ScheService {
  static async ScheAdd(scheAddReq: ScheduleDTO): Promise<Schedule> {
    try {
      const schedule = await ScheduleRepository.save({
        schedulename: scheAddReq.name,
        startTime: scheAddReq.startTime,
        endTime: scheAddReq.endTime,
        explanation: scheAddReq.explanation,
      });
      return schedule;
    } catch (error) {
      throw new InternalServerError('일정을 추가하는데 실패하였습니다.');
    }
  }

  static async ScheSave(schedule: Schedule): Promise<Schedule> {
    try {
      const resultsche = await ScheduleRepository.save(schedule);
      return resultsche;
    } catch (error) {
      throw new InternalServerError('일정에 반영하는 것을 실패하였습니다.');
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
        throw new BadRequestError('존재하지 않는 멤버입니다.');
      }
    } catch (error) {
      throw new InternalServerError('멤버를 찾는데 실패하였습니다.');
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
        throw new BadRequestError('존재하지 않는 모임입니다.');
      }
    } catch (error) {
      throw new InternalServerError('팀을 찾는데 실패하였습니다.');
    }
  }

  static async BelongTeamsFind(memberin: Member): Promise<Team[]> {
    try {
      const relations = await MemberTeamRepository.find({
        where: { member: { id: memberin.id } },
        relations: ['team'],
      });
      const preteams = relations.map((t) => t.team);
      const teams = preteams.filter((t) => t !== null);
      if (teams !== undefined) {
        return teams;
      } else {
        throw new InternalServerError(
          '소속 모임이 비정상적으로 처리되었습니다.',
        );
      }
    } catch (error) {
      throw new InternalServerError('소속 모임을 찾는데 실패하였습니다.');
    }
  }

  static async ScheFindByMem(memberin: Member): Promise<Schedule[]> {
    try {
      const relations = await MemberScheduleRepository.find({
        where: { member: { id: memberin.id } },
        relations: ['schedule'],
      });
      const preschedules = relations.map((t) => t.schedule);
      const schedules = preschedules.filter((t) => t !== null);
      if (schedules !== undefined) {
        return schedules;
      } else {
        throw new InternalServerError(
          '개인 일정이 비정상적으로 처리되었습니다.',
        );
      }
    } catch (error) {
      throw new InternalServerError('개인 일정 조회에 실패하였습니다.');
    }
  }

  static async ScheFindByTeam(teamin: Team): Promise<Schedule[]> {
    try {
      const relations = await TeamScheduleRepository.find({
        where: { team: { id: teamin.id } },
        relations: ['schedule'],
      });
      const preschedules = relations.map((t) => t.schedule);
      const schedules = preschedules.filter((t) => t !== null);
      if (schedules !== undefined) {
        return schedules;
      } else {
        throw new InternalServerError(
          '모임 일정이 비정상적으로 처리되었습니다.',
        );
      }
    } catch (error) {
      throw new InternalServerError('모임 일정 조회에 실패하였습니다.');
    }
  }

  static async ScheFindById(scheduleId: number): Promise<Schedule> {
    try {
      const schedule = await ScheduleRepository.findOne({
        where: { id: scheduleId },
      });
      if (schedule !== null) {
        return schedule;
      } else {
        throw new BadRequestError('존재하지 않는 일정입니다.');
      }
    } catch (error) {
      throw new InternalServerError('일정 조회에 실패하였습니다.');
    }
  }

  static async MemScheAdd(
    memberin: Member,
    schedulein: Schedule,
  ): Promise<MemberSchedule> {
    try {
      const memSche = await MemberScheduleRepository.save({
        member: memberin,
        schedule: schedulein,
      });
      return memSche;
    } catch (error) {
      throw new InternalServerError('사용자 일정 관계 저장에 실패하였습니다.');
    }
  }

  static async TeamScheAdd(
    teamin: Team,
    schedulein: Schedule,
  ): Promise<TeamSchedule> {
    try {
      const teamSche = await TeamScheduleRepository.save({
        team: teamin,
        schedule: schedulein,
      });
      return teamSche;
    } catch (error) {
      throw new InternalServerError('모임 일정 관계 저장에 실패하였습니다.');
    }
  }

  static async TeamMemFind(teamId: number): Promise<Member[]> {
    try {
      const teamin = await ScheService.TeamFindById(teamId);
      const relations = await MemberTeamRepository.find({
        where: { team: { id: teamin.id } },
        relations: ['member'],
      });
      const premembers = relations.map((t) => t.member);
      const members = premembers.filter((t) => t !== null);
      if (members !== undefined) {
        return members;
      } else {
        throw new InternalServerError('소속원이 비정상적으로 처리되었습니다.');
      }
    } catch (error) {
      throw new InternalServerError('소속원을 조회하는데 실패하였습니다.');
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
      throw new InternalServerError('개인 일정을 불러오는데 실패하였습니다.');
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
      throw new InternalServerError('모임 일정을 불러오는데 실패하였습니다.');
    }
  }

  static async ScheToScheduleDTO(schedulein: Schedule): Promise<ScheduleDTO> {
    try {
      const scheduleDTO: ScheduleDTO = {
        scheId: schedulein.id,
        name: schedulein.schedulename,
        startTime: schedulein.startTime,
        endTime: schedulein.endTime,
        explanation: schedulein.explanation,
      };
      return scheduleDTO;
    } catch (error) {
      throw new InternalServerError(
        '일정을 일정 송신 양식으로 변환하는데 실패하였습니다.',
      );
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
      throw new InternalServerError(
        '일정을 소속원 일정 양식으로 변환한는데 실패하였습니다.',
      );
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
      throw new InternalServerError(
        '모임 소속원들의 일정을 불러오는데 실패하였습니다.',
      );
    }
  }

  static async RelationFind(
    memberid: number,
    scheduleid: number,
  ): Promise<MemberSchedule | TeamSchedule | null> {
    try {
      const relation = await MemberScheduleRepository.findOne({
        where: { member: { id: memberid }, schedule: { id: scheduleid } },
      });
      if (relation !== null) {
        return relation;
      } else {
        const teamScheRelation = await TeamScheduleRepository.findOne({
          where: { schedule: { id: scheduleid } },
          relations: ['team'],
        });
        if (teamScheRelation != null) {
          const team = teamScheRelation.team;
          const memTeamRelation = await MemberTeamRepository.findOne({
            where: { team: { id: team.id } },
            relations: ['member'],
          });
          if (memTeamRelation != null) {
            return teamScheRelation;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    } catch (error) {
      throw new InternalServerError('관계 조회 실패');
    }
  }
}
