import { Position } from "./COMMON";

export interface CameraType {
	name: string;
	position: Position;
}

export interface Location {
    lat: number,
    lng: number
}

export interface CarCard {
	id: string;
	name: string;
	cameras: CameraType[];
    speed: string;
    driver: DriverProps;
    status: 'EMERGENCY' | 'WARNING' | 'NORMAL'
}
export interface CarLocation {
    id: string;
    name: string;
    location: Location;
}



export interface DriverProps {
	id: string;
	first_name: string;
	last_name: string;
	phone_no: string;
}

export interface RSUInformation {
    id: string;
    name: string;
    location: Location;
    radius: number;
    recommendSpeed: string;
}