import { PILL_LABEL } from "@/constants/LABEL";
import { CameraType } from "./ENTITY";
export interface Location {
    lat: number,
    lng: number
}

interface Driver {
    id: string,
    first_name: string,
    last_name: string,
    phone_no: string
}

export interface CarCard {
	id: string;
	name: string;
	cameras: CameraType[];
    speed: string;
    driver: Driver;
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