import { NoticeResDTO } from './notice.dto';
import { ScheduleDTO } from './schedule.dto';

export interface TeamCreateReqDTO {
  teamname: string;
  color: number;
  explanation: string;
  isPublic: boolean;
}

export interface MyTeamResDTO {
  teamId: number;
  teamname: string;
  isAdmin: boolean;
  isFavor: boolean;
  isPublic: boolean;
  isHide: boolean;
}

export interface TeamListResDTO {
  id: number;
  teamname: string;
  color: number;
  explanation: string;
}

export interface TeamUpdateReqDTO {
  teamname: string;
  color: number;
  explanation: string;
}

export interface TeamMemberDTO {
  id: number;
  name: string;
  isAdmin: boolean;
}

export interface TeamReadResDTO {
  teamname: string;
  color: number;
  explanation: string;
  isPublic: boolean;
  members: TeamMemberDTO[];
  schedules: ScheduleDTO[];
  notices: NoticeResDTO[];
  isAdmin: boolean;
}
