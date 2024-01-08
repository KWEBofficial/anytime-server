export interface NoticeResDTO {
  noticeId: number;
  content: string;
  createdAt: Date;
  isPrior: boolean;
}

export interface NoticeUpdateReqDTO {
  content: string;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
}
