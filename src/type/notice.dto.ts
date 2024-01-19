export interface NoticeAllTmResDTO {
  teamname: string;
  notices: NoticeAllResDTO[];
}

export interface NoticeAllResDTO {
  noticeId: number;
  content: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  isPrior: boolean;
}

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
