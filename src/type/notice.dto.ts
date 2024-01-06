
export default interface noticeResDTO {
    noticeId: number;
	content: string;
	createdAt: Date;
	isPrior: boolean;

}

export default interface noticeUpdateReqDTO {
    content: string;
	startDate: Date;
	endDate: Date;
	isPrior: boolean;
}
