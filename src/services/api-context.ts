import { IQuerry } from '@/types/common/query.model';

const API_CONTEXT = {
	CAR: {
		GET_CARS: `${process.env.NEXT_PUBLIC_API_URL}/cars`,
		GET_CARS_LIST: `${process.env.NEXT_PUBLIC_API_URL}/cars/list`,
		GET_CAR: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
		CREATE_CAR: `${process.env.NEXT_PUBLIC_API_URL}/cars`,
		UPDATE_CAR: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
		DELETE_CAR: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
	},
	DRIVER: {
		GET_DRIVERS: `${process.env.NEXT_PUBLIC_API_URL}/drivers`,
		GET_DRIVERS_LIST: `${process.env.NEXT_PUBLIC_API_URL}/drivers/list`,
		GET_DRIVER: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/drivers/${id}`,
		CREATE_DRIVER: `${process.env.NEXT_PUBLIC_API_URL}/drivers`,
		UPDATE_DRIVER: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/drivers/${id}`,
		DELETE_DRIVER: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/drivers/${id}`,
	},
	CAMERA: {
		GET_CAMERAS: `${process.env.NEXT_PUBLIC_API_URL}/cameras`,
		GET_CAMERAS_LIST: `${process.env.NEXT_PUBLIC_API_URL}/cameras/list`,
		GET_CAMERA: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cameras/${id}`,
		CREATE_CAMERA: `${process.env.NEXT_PUBLIC_API_URL}/cameras`,
		UPDATE_CAMERA: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cameras/${id}`,
		DELETE_CAMERA: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/cameras/${id}`,
	},
	RSU: {
		GET_RSUS: `${process.env.NEXT_PUBLIC_API_URL}/rsus`,
		GET_RSUS_LIST: `${process.env.NEXT_PUBLIC_API_URL}/rsus/list`,
		GET_RSU: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/rsus/${id}`,
		CREATE_RSU: `${process.env.NEXT_PUBLIC_API_URL}/rsus`,
		UPDATE_RSU: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/rsus/${id}`,
		DELETE_RSU: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/rsus/${id}`,
	},
	EMERGENCY: {
		GET_EMERGENCY_LIST: `${process.env.NEXT_PUBLIC_API_URL}/emergencies`,
		UPDATE_EMERGENCY: ({ id }: IQuerry) =>
			`${process.env.NEXT_PUBLIC_API_URL}/emergencies/${id}`,
	},
	VIDEO:{
		GET_EXISTING_VIDEO: ({ carName, cameraName }: any) => `${process.env.NEXT_PUBLIC_API_URL}/videos/exist-videos?car_id=${carName}&camera_id=${cameraName}`
	}
};

export default API_CONTEXT;
