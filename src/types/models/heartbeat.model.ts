import { StatusDotType } from '../COMMON';
import { ICar } from './car.model';
import { IRSU } from './rsu.model';

export interface ICarHeartbeat extends ICar {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
	front_cam: (typeof StatusDotType)[number];
	back_cam: (typeof StatusDotType)[number];
	left_cam: (typeof StatusDotType)[number];
	right_cam: (typeof StatusDotType)[number];
}

export interface IRSUHeartbeat extends IRSU {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
}
