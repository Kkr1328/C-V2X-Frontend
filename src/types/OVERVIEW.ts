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
	speed: string;
	status: PILL_LABEL;
}

export interface FocusState {
	id: string;
	type: 'CAR' | 'RSU';
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
