import { Position } from './COMMON';

export interface TableHeaderProps<T> {
	id: keyof T | 'action';
	label: string;
	align: 'right' | 'center' | 'left';
	isSorted?: boolean;
}

export interface TableRowProps {
	id: string;
	name: string;
}

export interface CameraType {
	id: string;
	name: string;
	position: Position;
}

export interface CarsProps {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	cameras: CameraType[];
	front_camera?: string;
	back_camera?: string;
	driver_id?: string;
}

export interface DriversProps {
	id: string;
	name: string;
	first_name: string;
	last_name: string;
	username: string;
	phone_no: string;
	password?: string;
	confirmed_password?: string;
}

export interface CamerasProps {
	id: string;
	name: string;
	position: Position;
	car_id: string;
}
