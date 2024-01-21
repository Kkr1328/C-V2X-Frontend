import { PILL_LABEL } from '@/constants/LABEL';

type SPEED = { velocity: number; unit: string };

export interface FLEET_HEARTBEAT {
	id: string;
	type: 'CAR' | 'RSU';
	data: {
		status: PILL_LABEL;
		front_camera: PILL_LABEL;
		back_camera: PILL_LABEL;
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
