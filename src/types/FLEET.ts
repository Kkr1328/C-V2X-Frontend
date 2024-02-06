import { STATUS } from '@/constants/LABEL';

type SPEED = { velocity: number; unit: string };
interface FLEET_HEARTBEAT_DATA {
	status: STATUS;
	connected_OBU: string[];
}

export interface FLEET_HEARTBEAT {
	id: string;
	type: 'CAR' | 'CAMERA' | 'RSU';
	data: FLEET_HEARTBEAT_DATA;
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
