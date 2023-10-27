import { EmergencyColumn } from '../COMMON';
import { IQuerry } from '../common/query.model';

export interface IUpdateEmergencyQuery {
	query: IQuerry;
	request: IEmergencyRequest;
}

export interface IEmergencyRequest {
	status: EmergencyColumn;
}

export interface IUpdateEmergencyRequest extends IEmergencyRequest {}

export interface IEmergency {
	id: string;
	status: EmergencyColumn;
	car_name: string;
	driver_phone_no: string;
	time: string;
}
