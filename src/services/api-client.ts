import { v4 as uuidv4 } from 'uuid';
import HttpClient from './http-client';
import API_CONTEXT from './api.context';
import { ResponseDataT } from '@/types/common/responseT.model';
import {
	ICreateRSURequest,
	IRSU,
	IUpdateRSURequest,
} from '@/types/models/rsu.model';
import { IQuerry } from '@/types/common/query.model';
import {
	ICamera,
	ICreateCameraRequest,
	IUpdateCameraRequest,
} from '@/types/models/camera.model';
import {
	ICar,
	ICreateCarRequest,
	IUpdateCarRequest,
} from '@/types/models/car.model';
import {
	ICreateDriverRequest,
	IDriver,
	IUpdateDriverRequest,
} from '@/types/models/driver.model';

class ApiClient extends HttpClient {
	constructor() {
		super(uuidv4());
	}

	get CAR() {
		return {
			GET_CARS: () => this.get<ResponseDataT<ICar[]>>(API_CONTEXT.CAR.GET_CARS),
			GET_CAR: (query: IQuerry) =>
				this.get<ResponseDataT<ICar>>(API_CONTEXT.CAR.GET_CAR(query)),
			CREATE_CAR: (request: ICreateCarRequest) =>
				this.post<ICreateCarRequest, ResponseDataT<null>>(
					API_CONTEXT.CAR.CREATE_CAR,
					request
				),
			UPDATE_CAR: (query: IQuerry, request: IUpdateCarRequest) =>
				this.put<IUpdateCarRequest, ResponseDataT<null>>(
					API_CONTEXT.CAR.UPDATE_CAR(query),
					request
				),
			DELETE_CAR: (query: IQuerry) =>
				this.delete<ResponseDataT<null>>(API_CONTEXT.CAR.DELETE_CAR(query)),
		};
	}

	get CAMERA() {
		return {
			GET_CAMERAS: () =>
				this.get<ResponseDataT<ICamera[]>>(API_CONTEXT.CAMERA.GET_CAMERAS),
			GET_CAMERA: (query: IQuerry) =>
				this.get<ResponseDataT<ICamera>>(API_CONTEXT.CAMERA.GET_CAMERA(query)),
			CREATE_CAMERA: (request: ICreateCameraRequest) =>
				this.post<ICreateCameraRequest, ResponseDataT<null>>(
					API_CONTEXT.CAMERA.CREATE_CAMERA,
					request
				),
			UPDATE_CAMERA: (query: IQuerry, request: IUpdateCameraRequest) =>
				this.put<IUpdateCameraRequest, ResponseDataT<null>>(
					API_CONTEXT.CAMERA.UPDATE_CAMERA(query),
					request
				),
			DELETE_CAMERA: (query: IQuerry) =>
				this.delete<ResponseDataT<null>>(
					API_CONTEXT.CAMERA.DELETE_CAMERA(query)
				),
		};
	}

	get DRIVER() {
		return {
			GET_DRIVERS: () =>
				this.get<ResponseDataT<IDriver[]>>(API_CONTEXT.DRIVER.GET_DRIVERS),
			GET_DRIVER: (query: IQuerry) =>
				this.get<ResponseDataT<IDriver>>(API_CONTEXT.DRIVER.GET_DRIVER(query)),
			CREATE_DRIVER: (request: ICreateDriverRequest) =>
				this.post<ICreateDriverRequest, ResponseDataT<null>>(
					API_CONTEXT.DRIVER.CREATE_DRIVER,
					request
				),
			UPDATE_DRIVER: (query: IQuerry, request: IUpdateDriverRequest) =>
				this.put<IUpdateDriverRequest, ResponseDataT<null>>(
					API_CONTEXT.DRIVER.UPDATE_DRIVER(query),
					request
				),
			DELETE_DRIVER: (query: IQuerry) =>
				this.delete<ResponseDataT<null>>(
					API_CONTEXT.DRIVER.DELETE_DRIVER(query)
				),
		};
	}

	get RSU() {
		return {
			GET_RSUS: () => this.get<ResponseDataT<IRSU[]>>(API_CONTEXT.RSU.GET_RSUS),
			GET_RSU: (query: IQuerry) =>
				this.get<ResponseDataT<IRSU>>(API_CONTEXT.RSU.GET_RSU(query)),
			CREATE_RSU: (request: ICreateRSURequest) =>
				this.post<ICreateRSURequest, ResponseDataT<null>>(
					API_CONTEXT.RSU.CREATE_RSU,
					request
				),
			UPDATE_RSU: (query: IQuerry, request: IUpdateRSURequest) =>
				this.put<IUpdateRSURequest, ResponseDataT<null>>(
					API_CONTEXT.RSU.UPDATE_RSU(query),
					request
				),
			DELETE_RSU: (query: IQuerry) =>
				this.delete<ResponseDataT<null>>(API_CONTEXT.RSU.DELETE_RSU(query)),
		};
	}
}

export default ApiClient;
