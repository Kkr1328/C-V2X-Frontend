import { Position } from './COMMON';

export interface TableHeaderProps<T> {
	id: keyof T | 'action';
	label: string;
	align: 'right' | 'center' | 'left';
	isSorted?: boolean;
}

export interface TableProps {
	id: string;
	name: string;
}

export interface CameraType {
	name: string;
	position: Position;
}

export interface CarsTableProps {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	cameras: CameraType;
	driver: string;
	//
	front_camera?: string;
	back_camera?: string;
}

export interface DriversTableProps {
	id: string;
	name: string;
	username: string;
	phone_no: string;
}

export interface CamerasTableProps {
	id: string;
	name: string;
	position: Position;
	car: string;
}

export interface RSUsTableProps {
	id: string;
	name: string;
	rec_speed: string;
}
