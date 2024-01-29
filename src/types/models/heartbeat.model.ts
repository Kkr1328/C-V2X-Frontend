import { STATUS } from '@/constants/LABEL';
import { ICar } from './car.model';
import { IRSU } from './rsu.model';

export interface ICarHeartbeat extends ICar {
	id: string;
	name: string;
	status: STATUS;
	front_cam: STATUS;
	back_cam: STATUS;
	left_cam: STATUS;
	right_cam: STATUS;
}

export interface IRSUHeartbeat extends IRSU {
	id: string;
	name: string;
	status: STATUS;
}
