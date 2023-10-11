import { IQuerry } from '@/types/common/query.model';

const PREFIX = 'http://localhost:5000/api';

const API_CONTEXT = {
	CAR: {
		GET_CARS: `${PREFIX}/cars`,
		GET_CARS_LIST: `${PREFIX}/cars/list`,
		GET_CAR: ({ id }: IQuerry) => `${PREFIX}/cars/${id}`,
		CREATE_CAR: `${PREFIX}/cars`,
		UADATE_CAR: ({ id }: IQuerry) => `${PREFIX}/cars/${id}`,
		DELETE_CAR: ({ id }: IQuerry) => `${PREFIX}/cars/${id}`,
	},
	DRIVER: {
		GET_DRIVERS: `${PREFIX}/drivers`,
		GET_DRIVERS_LIST: `${PREFIX}/drivers/list`,
		GET_DRIVER: ({ id }: IQuerry) => `${PREFIX}/drivers/${id}`,
		CREATE_DRIVER: `${PREFIX}/drivers`,
		UADATE_DRIVER: ({ id }: IQuerry) => `${PREFIX}/drivers/${id}`,
		DELETE_DRIVER: ({ id }: IQuerry) => `${PREFIX}/drivers/${id}`,
	},
	CAMERA: {
		GET_CAMERAS: `${PREFIX}/cameras`,
		GET_CAMERAS_LIST: `${PREFIX}/cameras/list`,
		GET_CAMERA: ({ id }: IQuerry) => `${PREFIX}/cameras/${id}`,
		CREATE_CAMERA: `${PREFIX}/cameras`,
		UADATE_CAMERA: ({ id }: IQuerry) => `${PREFIX}/cameras/${id}`,
		DELETE_CAMERA: ({ id }: IQuerry) => `${PREFIX}/cameras/${id}`,
	},
	RSU: {
		GET_RSUS: `${PREFIX}/rsus`,
		GET_RSUS_LIST: `${PREFIX}/rsus/list`,
		GET_RSU: ({ id }: IQuerry) => `${PREFIX}/rsus/${id}`,
		CREATE_RSU: `${PREFIX}/rsus`,
		UADATE_RSU: ({ id }: IQuerry) => `${PREFIX}/rsus/${id}`,
		DELETE_RSU: ({ id }: IQuerry) => `${PREFIX}/rsus/${id}`,
	},
};

export default API_CONTEXT;
