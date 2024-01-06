export interface MemberRegisterReqDTO {
  membername: string;
  email: string;
  password: string;
}

export interface MemberLoginReqDTO {
  email: string;
  password: string;
}

export interface MemberSearchResDTO {
  memberId: number;
  membername: string;
}
