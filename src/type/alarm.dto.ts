export interface AlarmResDTO {
  alarmId: number;
  teamId: number;
  scheduleId: number;
  content: string;
  isRead: boolean;
}

export interface InviteAlarmResDTO {
  alarmId: number;
  teamId: number;
  content: string;
  isRead: boolean;
}
