export interface CarInformation {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	driver: string | null;
}

export interface DriverInformation {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	phone_no: string;
}

export interface CameraInformation {
	id: string;
	name: string;
	rec_speed: string;
}

export interface RSUInformation {
	id: string;
	name: string;
	rec_speed: string;
}
