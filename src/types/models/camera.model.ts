import { IQuerry } from '../common/query.model';

export interface IGetCameraQuery extends IQuerry {}
export interface IUpdateCameraQuery {
	query: IQuerry;
	request: ICameraRequest;
}
export interface IDeleteCameraQuery extends IQuerry {}

export interface ICameraRequest {
	name: string;
	position: string;
	car_id: string;
}

export interface IGetCamerasRequest {
	id?: string;
	name?: string;
	position?: string;
	car_id?: string;
}
export interface ICreateCameraRequest extends ICameraRequest {}
export interface IUpdateCameraRequest extends ICameraRequest {}

export interface ICamera {
	_id: string;
	name: string;
	position: string;
	car: string;
}
