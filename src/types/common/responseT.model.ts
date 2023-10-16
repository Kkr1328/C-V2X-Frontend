import { StatusType } from './status.model';

export interface ResponseDataT<T> {
	status: StatusType;
	data?: T;
}
