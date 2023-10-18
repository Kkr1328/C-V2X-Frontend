import { PILL_LABEL } from "@/constants/LABEL";
import { CameraType } from "./ENTITY";
import { IDriver } from "@/types/models/driver.model"
export interface Location {
    lat: number,
    lng: number
}

export interface CarCard {
	id: string;
	name: string;
	cameras: CameraType[];
    speed: string;
    driver: IDriver;
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

    connectedCar: {
        status: PILL_LABEL,
        name: string,
        speed: string
    }[]
}