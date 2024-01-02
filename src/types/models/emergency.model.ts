import { EmergencyColumn } from '../COMMON';
import { IQuerry } from '../common/query.model';
export interface IEmergency {
	id: string;
	status: EmergencyColumn;
	car_id: string;
	car_name: string;
	time: string;
	driver_phone_no: string;
}

export interface IUpdateEmergencyQuery extends IQuerry {
	request: IUpdateEmergencyRequest;
}

export interface IUpdateEmergencyRequest {
	car_id: string;
	status: EmergencyColumn;
}
