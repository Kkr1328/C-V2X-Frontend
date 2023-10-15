import { IQuerry } from '../common/query.model';

export interface IGetDriverQuery extends IQuerry {}
export interface IUpdateDriverQuery {
	query: IQuerry;
	request: IDriverRequest;
}
export interface IDeleteDriverQuery extends IQuerry {}

export interface IDriverRequest {
	first_name: string;
	last_name: string;
	phone_no: string;
	username: string;
	password: string;
}

export interface IGetDriversRequest {
	id?: string;
	first_name?: string;
	last_name?: string;
	username?: string;
	phone_no?: string;
}
export interface ICreateDriverRequest extends IDriverRequest {}
export interface IUpdateDriverRequest extends IDriverRequest {}

export interface IDriver {
	id: string;
	name: string;
	first_name: string;
	last_name: string;
	phone_no: string;
	username: string;
}

export interface IDriverInput extends IDriver, IDriverRequest {
	confirmed_password: string;
}
