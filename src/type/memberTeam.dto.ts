export default interface InviteReqDTO {
  teamId: number;
  memberId: number;
}

export default interface AdminReqDTO {
  memberId: number;
  teamId: number;
  isAdmin: boolean;
}
