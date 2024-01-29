import { Position } from '../COMMON';
import { IQuerry } from '../common/query.model';

export interface IGetCameraQuery extends IQuerry {}
export interface IUpdateCameraQuery {
	query: IQuerry;
	request: ICameraRequest;
}
export interface IDeleteCameraQuery extends IQuerry {}

export interface ICameraRequest {
	name: string;
	position: Position;
	car_id: string;
}

export interface IGetCamerasRequest {
	id?: string;
	name?: string;
	position?: Position;
	car_id?: string;
}
export interface ICreateCameraRequest extends ICameraRequest {}
export interface IUpdateCameraRequest extends ICameraRequest {}

export interface ICamera {
	id: string;
	name: string;
	position: Position;
	car_id: string;
	car: string;
}
