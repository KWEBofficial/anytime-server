export interface InviteReqDTO {
  teamId: number;
  memberId: number;
}

export interface AdminReqDTO {
  memberId: number;
  teamId: number;
  isAdmin: boolean;
}
