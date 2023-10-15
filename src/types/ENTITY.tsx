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
