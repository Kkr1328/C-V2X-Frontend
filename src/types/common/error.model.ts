interface ErrorData {
	success: boolean;
	error: string;
}

export interface ErrorCommon {
	isError: boolean;
	message: string;
	status: number;
	traceId: string;
	data: ErrorData;
}
