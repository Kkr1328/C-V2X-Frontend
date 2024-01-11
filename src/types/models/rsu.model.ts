import { IQuerry } from '../common/query.model';

export interface IGetRSUQuery extends IQuerry {}
export interface IUpdateRSUQuery {
	query: IQuerry;
	request: IRSURequest;
}
export interface IDeleteRSUQuery extends IQuerry {}

export interface IRSURequest {
	name: string;
	recommended_speed: string;
}

export interface IGetRSUsRequest {
	id?: string;
	name?: string;
	recommended_speed?: string;
}
export interface ICreateRSURequest extends IRSURequest {}
export interface IUpdateRSURequest extends IRSURequest {}

export interface IRSU {
	id: string;
	name: string;
	recommended_speed: string;
}
