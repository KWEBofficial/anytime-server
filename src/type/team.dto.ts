export default interface TeamCreateReqDTO {
  teamname: string;
  color: number;
  explanation: string;
  isPublic: boolean;
}

export default interface MyTeamResDTO {
  teamId: number;
  teamname: string;
  isAdmin: boolean;
  isFavor: boolean;
  isPublic: boolean;
  isHide: boolean;
}

export default interface TeamListResDTO {
  teamId: number;
  teamname: string;
  color: number;
  explanation: string;
}

export default interface TeamUpdateReqDTO {
  teamname: string;
  color: number;
  explanation: string;
}

export interface TeamMemberDTO {
  id: number;
  name: string;
  isAdmin: boolean;
}

export default interface TeamReadResDTO {
  teamname: string;
  color: number;
  explanation: string;
  isPublic: boolean;
  members: TeamMemberDTO[];
  //schedules : ScheduleDTO[];
  //notices : NoticeResDTO[];
  isAdmin: boolean;
}
