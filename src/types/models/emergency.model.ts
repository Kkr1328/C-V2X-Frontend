import { IQuerry } from '../common/query.model';

export type Emergency = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export type EmergencyStateId = 'pending' | 'inProgress' | 'complete';

export interface IUpdateEmergencyQuery {
	query: IQuerry;
	request: IEmergencyRequest;
}

export interface IEmergencyRequest {
	status: EmergencyStateId;
}

export interface IUpdateEmergencyRequest extends IEmergencyRequest {}

export interface IEmergency {
	id: string;
	status: EmergencyStateId;
	car_name: string;
	driver_phone_no: string;
	time: string;
}
