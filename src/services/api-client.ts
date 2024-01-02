import { v4 as uuidv4 } from 'uuid';
import HttpClient from './http-client';
import API_CONTEXT from './api-context';
import { ResponseDataT } from '@/types/common/responseT.model';
import {
	ICreateRSURequest,
	IGetRSUsRequest,
	IRSU,
	IUpdateRSURequest,
} from '@/types/models/rsu.model';
import { IQuerry } from '@/types/common/query.model';
import {
	ICamera,
	ICreateCameraRequest,
	IGetCamerasRequest,
	IUpdateCameraRequest,
} from '@/types/models/camera.model';
import {
	ICar,
	ICreateCarRequest,
	IGetCarsRequest,
	IUpdateCarRequest,
} from '@/types/models/car.model';
import {
	ICreateDriverRequest,
	IDriver,
	IGetDriversRequest,
	IUpdateDriverRequest,
} from '@/types/models/driver.model';
import { IResponseList } from '@/types/common/responseList.model';
import {
	IEmergency,
	IUpdateEmergencyRequest,
} from '@/types/models/emergency.model';

class ApiClient extends HttpClient {
	constructor() {
		super(uuidv4());
	}

	get CAR() {
		return {
			GET_CARS: (request: IGetCarsRequest) =>
				this.put<IGetCarsRequest, ResponseDataT<ICar[]>>(
					API_CONTEXT.CAR.GET_CARS,
					request
				),
			GET_CARS_LIST: () =>
				this.get<ResponseDataT<IResponseList[]>>(API_CONTEXT.CAR.GET_CARS_LIST),
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
			GET_CAMERAS: (request: IGetCamerasRequest) =>
				this.put<IGetCamerasRequest, ResponseDataT<ICamera[]>>(
					API_CONTEXT.CAMERA.GET_CAMERAS,
					request
				),
			GET_CAMERAS_LIST: () =>
				this.get<ResponseDataT<IResponseList[]>>(
					API_CONTEXT.CAMERA.GET_CAMERAS_LIST
				),
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
			GET_DRIVERS: (request: IGetDriversRequest) =>
				this.put<IGetDriversRequest, ResponseDataT<IDriver[]>>(
					API_CONTEXT.DRIVER.GET_DRIVERS,
					request
				),
			GET_DRIVERS_LIST: () =>
				this.get<ResponseDataT<IResponseList[]>>(
					API_CONTEXT.DRIVER.GET_DRIVERS_LIST
				),
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
			GET_RSUS: (request: IGetRSUsRequest) =>
				this.put<IGetRSUsRequest, ResponseDataT<IRSU[]>>(
					API_CONTEXT.RSU.GET_RSUS,
					request
				),
			GET_RSUS_LIST: () =>
				this.get<ResponseDataT<IResponseList[]>>(API_CONTEXT.RSU.GET_RSUS_LIST),
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

	get EMERGENCY() {
		return {
			GET_EMERGENCIES: () =>
				this.get<ResponseDataT<IEmergency[]>>(
					API_CONTEXT.EMERGENCY.GET_EMERGENCIES
				),
			UPDATE_EMERGENCY: (query: IQuerry, request: IUpdateEmergencyRequest) =>
				this.put<IUpdateEmergencyRequest, ResponseDataT<null>>(
					API_CONTEXT.EMERGENCY.UPDATE_EMERGENCY(query),
					request
				),
		};
	}
}

export default ApiClient;
