import { EmergencyColumn } from '../COMMON';

export interface IEmergency {
	id: string;
	status: EmergencyColumn;
	car_name: string;
	time: string;
	driver_phone_no: string;
}
