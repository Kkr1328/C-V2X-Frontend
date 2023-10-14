import { CameraType } from '../ENTITY';
import { IQuerry } from '../common/query.model';

export interface IGetCarQuery extends IQuerry {}
export interface IUpdateCarQuery {
	query: IQuerry;
	request: ICarRequest;
}
export interface IDeleteCarQuery extends IQuerry {}

export interface ICarRequest {
	name: string;
	license_plate: string;
	model: string;
	driver_id: string;
	front_cam_id: string;
	back_cam_id: string;
}

export interface IGetCarsRequest {
	id?: string;
	name?: string;
	license_plate?: string;
	model?: string;
	driver_id?: string;
	front_cam_id?: string;
	back_cam_id?: string;
}
export interface ICreateCarRequest extends ICarRequest {}
export interface IUpdateCarRequest extends ICarRequest {}

export interface ICar {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	cameras: CameraType[];
	driver_id: string;
	driver: string;
}
