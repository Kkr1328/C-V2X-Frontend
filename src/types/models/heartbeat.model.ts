import { StatusDotType } from '../COMMON';

export interface ICarHeartbeat {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
	front_cam: (typeof StatusDotType)[number];
	back_cam: (typeof StatusDotType)[number];
}

export interface IRSUHeartbeat {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
}
