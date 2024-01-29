import { STATUS } from '@/constants/LABEL';

type SPEED = { velocity: number; unit: string };

export interface FLEET_HEARTBEAT {
	id: string;
	type: 'CAR' | 'RSU';
	data: {
		status: STATUS;
		front_camera: STATUS;
		back_camera: STATUS;
		left_camera: STATUS;
		right_camera: STATUS;
		connected_OBU: string[];
	};
	timestamp: string;
}

export interface FLEET_LOCATION {
	id: string;
	type: 'CAR' | 'RSU';
	latitude: number;
	longitude: number;
	timestamp: string;
}

export interface FLEET_CAR_SPEED extends SPEED {
	id: string;
	timestamp: string;
}
