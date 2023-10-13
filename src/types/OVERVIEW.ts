import { PILL_LABEL } from "@/constants/LABEL";
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
    status: PILL_LABEL;
}
export interface StuffLocation {
    id: string;
    name: string;
    location: Location;
    status?: PILL_LABEL;
}

export interface RSUInformation extends StuffLocation {
    radius: number;
    recommendSpeed: string;
}

export interface DriverProps {
	id: string;
	first_name: string;
	last_name: string;
	phone_no: string;
}