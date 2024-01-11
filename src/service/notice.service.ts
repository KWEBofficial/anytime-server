import { DeleteResult, createQueryBuilder } from 'typeorm';
import Notice from '../entity/notice.entity';
import NoticeRepository from '../repository/notice.repository';
import TeamRepository from '../repository/team.repository';
import { BadRequestError, InternalServerError } from '../util/customErrors';
import Team from '../entity/team.entity';
import MemberRepository from '../repository/member.repository';
import Member from '../entity/member.entity';
import MemberTeam from '../entity/memberTeam.entity';
import MemberTeamRepository from '../repository/memberTeam.respository';
import Schedule from '../entity/schedule.entity';
import ScheduleRepository from '../repository/schedule.repository';
import TeamScheduleRepository from '../repository/teamSchedule.repository';
import TeamSchedule from '../entity/teamSchedule.entity';

export default class NoticeService {
  static async findTeamById(teamId: number): Promise<Team | null> {
    try {
      const team = await TeamRepository.findOne({
        where: { id: teamId },
      });
      return team;
    } catch (error) {
      throw new InternalServerError('모임을 찾는 데 실패하였습니다.');
    }
  }
  static async findNoticeById(noticeId: number): Promise<Notice | null> {
    try {
      const notice = await NoticeRepository.findOne({
        where: { id: noticeId },
      });
      return notice;
    } catch (error) {
      throw new InternalServerError('공지를 찾는 데 실패하였습니다.');
    }
  }

  static async findScheById(scheId: number): Promise<Schedule | null> {
    try {
      const schedule = await ScheduleRepository.findOne({
        where: { id: scheId },
      });
      return schedule;
    } catch (error) {
      throw new InternalServerError('일정을 찾는 데 실패하였습니다.');
    }
  }

  static async findTeamScheByScheId(
    scheId: number,
  ): Promise<TeamSchedule | null> {
    try {
      const teamSchedule = await TeamScheduleRepository.findOne({
        where: { schedule: { id: scheId } },
        relations: ['team'],
      });
      return teamSchedule;
    } catch (error) {
      throw new InternalServerError('모임-일정을 찾는 데 실패하였습니다.');
    }
  }
  static async findMemberTeam(
    memberId: number,
    teamId: number,
  ): Promise<MemberTeam | null> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      return memberTeam;
    } catch (error) {
      throw new InternalServerError('멤버-모임을 찾는 데 실패하였습니다.');
    }
  }
  static async getTeamIdByNoticeId(noticeId: number): Promise<number | null> {
    try {
      const notice = await NoticeRepository.findOne({
        where: { id: noticeId },
        relations: ['team'],
      });
      if (!notice) return null;
      else return notice.team.id;
    } catch (error) {
      throw new InternalServerError('모임을 찾는 데 실패하였습니다.');
    }
  }

  static async getNoticeByTeamId(teamId: number): Promise<Notice[] | null> {
    try {
      const team = await TeamRepository.findOne({
        where: { id: teamId },
        relations: ['notices'],
      });
      if (!team) return null;
      else return team.notices;
    } catch (error) {
      throw new BadRequestError('해당하는 모임이 없습니다.');
    }
  }

  static async createNotice(
    team: Team,
    content: string,
    startDate: Date,
    endDate: Date,
    isPrior: boolean,
  ): Promise<Notice> {
    try {
      const newNotice = new Notice();
      newNotice.content = content;
      newNotice.startDate = startDate;
      newNotice.endDate = endDate;
      newNotice.isPrior = isPrior;
      newNotice.team = team;

      return await NoticeRepository.save(newNotice);
    } catch (error) {
      throw new InternalServerError(
        '공지사항 정보를 저장하는데 실패하였습니다.',
      );
    }
  }

  static async updateNotice(
    id: number,
    content: string,
    startDate: Date,
    endDate: Date,
    isPrior: boolean,
  ): Promise<Notice> {
    try {
      const notice = await NoticeRepository.findOne({ where: { id: id } });
      return await NoticeRepository.save({
        id: id,
        team: notice?.team,
        content: content,
        startDate: startDate,
        endDate: endDate,
        isPrior: isPrior,
      });
    } catch (error) {
      throw new InternalServerError(
        '공지사항 정보를 수정하는데 실패하였습니다.',
      );
    }
  }

  static async deleteNoticeById(id: number): Promise<DeleteResult> {
    try {
      return await NoticeRepository.softDelete({ id: id });
    } catch (error) {
      throw new InternalServerError('공지사항을 삭제하는데 실패하였습니다.');
    }
  }
}
