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

export interface CarsTableRowProps {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	camera: string;
	driver: string;
}

export interface DriversTableRowProps {
	id: string;
	name: string;
	username: string;
	phone_no: string;
}

export interface CamerasTableRowProps {
	id: string;
	name: string;
	position: Position;
	car: string;
}

export interface RSUsTableRowProps {
	id: string;
	name: string;
	rec_speed: number;
}
