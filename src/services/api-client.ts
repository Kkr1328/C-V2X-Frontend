import { v4 as uuidv4 } from 'uuid';
import HttpClient from './http-client';
import API_CONTEXT from './api.context';
import { ResponseDataT } from '@/types/common/responseT.model';
import { ICreateRSURequest, IRSU } from '@/types/models/rsu.model';

class ApiClient extends HttpClient {
	constructor() {
		super(uuidv4());
	}

	get RSU() {
		return {
			GET_RSUS: () => this.get<ResponseDataT<IRSU[]>>(API_CONTEXT.RSU.GET_RSUS),
			CREATE_RSU: (request: ICreateRSURequest) =>
				this.post<ICreateRSURequest, ResponseDataT<null>>(
					API_CONTEXT.RSU.CREATE_RSU,
					request
				),
		};
	}
}

export default ApiClient;
