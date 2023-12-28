import {
	ICreateCameraRequest,
	IDeleteCameraQuery,
	IGetCameraQuery,
	IGetCamerasRequest,
	IUpdateCameraQuery,
} from '@/types/models/camera.model';
import {
	ICreateCarRequest,
	IDeleteCarQuery,
	IGetCarQuery,
	IGetCarsRequest,
	IUpdateCarQuery,
} from '@/types/models/car.model';
import {
	ICreateDriverRequest,
	IDeleteDriverQuery,
	IGetDriverQuery,
	IGetDriversRequest,
	IUpdateDriverQuery,
} from '@/types/models/driver.model';
import { IUpdateEmergencyQuery } from '@/types/models/emergency.model';
import {
	ICreateRSURequest,
	IDeleteRSUQuery,
	IGetRSUQuery,
	IGetRSUsRequest,
	IUpdateRSUQuery,
} from '@/types/models/rsu.model';
import { executeApiCall } from '@/utils/ApiCall';

// Camera
export const getCamerasAPI = async (request: IGetCamerasRequest) =>
	executeApiCall((service) => service.CAMERA.GET_CAMERAS(request));

export const getCamerasListAPI = async () =>
	executeApiCall((service) => service.CAMERA.GET_CAMERAS_LIST());

export const getCameraAPI = async (query: IGetCameraQuery) =>
	executeApiCall((service) => service.CAMERA.GET_CAMERA(query));

export const createCameraAPI = async (request: ICreateCameraRequest) =>
	executeApiCall((service) => service.CAMERA.CREATE_CAMERA(request));

export const updateCameraAPI = async (query: IUpdateCameraQuery) =>
	executeApiCall((service) =>
		service.CAMERA.UPDATE_CAMERA(query.query, query.request)
	);

export const deleteCameraAPI = async (query: IDeleteCameraQuery) =>
	executeApiCall((service) => service.CAMERA.DELETE_CAMERA(query));

// Car
export const getCarsAPI = async (request: IGetCarsRequest) =>
	executeApiCall((service) => service.CAR.GET_CARS(request));

export const getCarsListAPI = async () =>
	executeApiCall((service) => service.CAR.GET_CARS_LIST());

export const getCarAPI = async (query: IGetCarQuery) =>
	executeApiCall((service) => service.CAR.GET_CAR(query));

export const createCarAPI = async (request: ICreateCarRequest) =>
	executeApiCall((service) => service.CAR.CREATE_CAR(request));

export const updateCarAPI = async (query: IUpdateCarQuery) =>
	executeApiCall((service) =>
		service.CAR.UPDATE_CAR(query.query, query.request)
	);

export const deleteCarAPI = async (query: IDeleteCarQuery) =>
	executeApiCall((service) => service.CAR.DELETE_CAR(query));

// Driver
export const getDriversAPI = async (request: IGetDriversRequest) =>
	executeApiCall((service) => service.DRIVER.GET_DRIVERS(request));

export const getDriversListAPI = async () =>
	executeApiCall((service) => service.DRIVER.GET_DRIVERS_LIST());

export const getDriverAPI = async (query: IGetDriverQuery) =>
	executeApiCall((service) => service.DRIVER.GET_DRIVER(query));

export const createDriverAPI = async (request: ICreateDriverRequest) =>
	executeApiCall((service) => service.DRIVER.CREATE_DRIVER(request));

export const updateDriverAPI = async (query: IUpdateDriverQuery) =>
	executeApiCall((service) =>
		service.DRIVER.UPDATE_DRIVER(query.query, query.request)
	);

export const deleteDriverAPI = async (query: IDeleteDriverQuery) =>
	executeApiCall((service) => service.DRIVER.DELETE_DRIVER(query));

// RSU
export const getRSUsAPI = async (request: IGetRSUsRequest) =>
	executeApiCall((service) => service.RSU.GET_RSUS(request));

export const getRSUsListAPI = async () =>
	executeApiCall((service) => service.RSU.GET_RSUS_LIST());

export const getRSUAPI = async (query: IGetRSUQuery) =>
	executeApiCall((service) => service.RSU.GET_RSU(query));

export const createRSUAPI = async (request: ICreateRSURequest) =>
	executeApiCall((service) => service.RSU.CREATE_RSU(request));

export const updateRSUAPI = async (query: IUpdateRSUQuery) =>
	executeApiCall((service) =>
		service.RSU.UPDATE_RSU(query.query, query.request)
	);

export const deleteRSUAPI = async (query: IDeleteRSUQuery) =>
	executeApiCall((service) => service.RSU.DELETE_RSU(query));

// Emergency
export const getEmergencyListAPI = async () =>
	executeApiCall((service) => service.EMERGENCY.GET_EMERGENCY_LIST());

export const updateEmergencyAPI = async (query: IUpdateEmergencyQuery) =>
	executeApiCall((service) =>
		service.EMERGENCY.UPDATE_EMERGENCY(query, query.request)
	);
