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
}

export interface IGetCarsRequest {
	id?: string;
	name?: string;
	license_plate?: string;
	model?: string;
	driver_id?: string;
}
export interface ICreateCarRequest extends ICarRequest {}
export interface IUpdateCarRequest extends ICarRequest {}

export interface ICar {
	_id: string;
	name: string;
	license_plate: string;
	model: string;
	front_camera: string;
	back_camera: string;
	driver: string;
}
