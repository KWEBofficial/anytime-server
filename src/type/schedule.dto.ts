export interface ScheAddDTO {
  name: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}

export interface ScheduleDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}

export interface TeamScheduleDTO {
  teamId: number;
  teamname: string;
  schedules: ScheduleDTO[];
}

export interface AllScheSearchDTO {
  MySchedules: ScheduleDTO[];
  TeamSchedules: TeamScheduleDTO[];
}

export interface ScheEditDTO {
  name: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}

export default interface ScheDTO {
  startDate: Date;
  endDate: Date;
}

export default interface TeamMemScheDTO {
  memberId: number;
  schedules: ScheDTO[];
}
