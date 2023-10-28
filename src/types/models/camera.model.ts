import { IQuerry } from '../common/query.model';

export type Position = 'Front' | 'Back';

export interface CameraType {
	id: string;
	name: string;
	position: Position;
}

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
	id: string;
	name: string;
	position: string;
	car_id: string;
	car: string;
}
