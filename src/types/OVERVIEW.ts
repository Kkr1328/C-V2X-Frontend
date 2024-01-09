import { PILL_LABEL } from '@/constants/LABEL';
import { CameraType } from './ENTITY';
export interface Location {
	lat: number;
	lng: number;
}

interface Driver {
	id: string;
	first_name: string;
	last_name: string;
	phone_no: string;
}

export interface CarCard {
	id: string;
	name: string;
	cameras?: CameraType[];
	speed?: string;
	driver?: Driver;
	status?: PILL_LABEL;
}

export interface FocusState {
	id: string;
	type: 'CAR' | 'RSU';
	location: Location;
}

export interface StuffLocation {
	id: string;
	type: 'RSU' | 'CAR';
	location: Location;
	status?: PILL_LABEL;
}

export interface RSUInformation extends StuffLocation {
	name: string;
	radius: number;
	recommendSpeed: string;

	connectedCar: {
		status: PILL_LABEL;
		name: string;
		speed: string;
	}[];
}

export interface CONNECTED_CAR_ON_RSU {
	status: PILL_LABEL;
	name: string;
	speed: string;
}

type SPEED = { velocity: number; unit: string };
export interface FLEET_CAR {
	[key: string]: {
		name: string;
		status: PILL_LABEL;
		speed: SPEED;
		location: Location;
	};
}

export interface FLEET_RSU {
	[key: string]: {
		name: string;
		status: PILL_LABEL;
		recommendSpeed: SPEED;
		connected_OBU: string[];
		location: Location;
	};
}

export interface FLEET_CAR_LOCATION {
	id: string;
	type: 'CAR' | 'RSU';
	latitude: number;
	longitude: number;
	timestamp: string;
}

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

export interface FLEET_HEAR<T, U> extends FLEET_HEARTBEAT {}

export interface FLEET_CAR_SPEED extends SPEED {
	id: string;
	timestamp: string;
}
