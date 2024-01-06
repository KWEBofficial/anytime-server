export interface ScheduleDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}

export interface TeamScheResDTO {
  teamId: number;
  teamname: string;
  schedules: ScheduleDTO[];
}

export interface AllScheSearchResDTO {
  MySchedules: ScheduleDTO[];
  TeamSchedules: TeamScheResDTO[];
}

export interface ScheResDTO {
  startDate: Date;
  endDate: Date;
}

export interface TeamMemScheDTO {
  memberId: number;
  schedules: ScheResDTO[];
}
