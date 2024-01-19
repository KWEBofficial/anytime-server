export interface ScheduleDTO {
  scheId: number;
  name: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}

export interface TeamScheResDTO {
  teamId: number;
  teamname: string;
  isHide: boolean;
  color: string;
  schedules: ScheduleDTO[];
}

export interface AllScheSearchResDTO {
  mySchedules: ScheduleDTO[];
  teamSchedules: TeamScheResDTO[];
}

export interface ScheResDTO {
  startTime: Date;
  endTime: Date;
}

export interface TeamMemScheDTO {
  memberId: number;
  schedules: ScheResDTO[];
}
