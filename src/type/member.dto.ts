export default interface MemberRegisterReqDTO {
  membername: string;
  email: string;
  password: string;
}

export default interface MemberLoginReqDTO {
  email: string;
  password: string;
}

export default interface MemberSearchResDTO {
  memberId: number;
  membername: string;
}
