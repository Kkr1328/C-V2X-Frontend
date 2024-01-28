import { STATUS } from '@/constants/LABEL';

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

interface Camera {
	id: string;
	name: string;
	position: string;
}
[];
export interface CarCard {
	id: string;
	name: string;
	cameras?: Camera[];
	driver?: Driver;
	speed: string;
	status: STATUS;
}

export interface FocusState {
	id: string;
	type: 'CAR' | 'RSU';
	location: Location | null;
	zoom: number | null;
}

export interface StuffLocation {
	id: string;
	type: 'RSU' | 'CAR';
	location: Location;
	status?: STATUS;
}

export interface RSUInformation extends StuffLocation {
	name: string;
	radius: number;
	recommendSpeed: string;

	connectedCar: {
		status: STATUS;
		name: string;
		speed: string;
	}[];
}

export interface CONNECTED_CAR_ON_RSU {
	id: string;
	name: string;
}
