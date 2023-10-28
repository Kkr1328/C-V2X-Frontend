import { EmergencyStateId } from '@/types/models/emergency.model';

export const MockedPendingEmergency = [
	{
		id: '5f832341cc119a50d1adb972',
		status: 'pending' as EmergencyStateId,
		car_name: 'Car01',
		time: '1.00 am',
		driver_phone_no: '000-000-0001',
	},
	{
		id: '5f832341e1d0f20fc283177a',
		status: 'pending' as EmergencyStateId,
		car_name: 'Car02',
		time: '2.00 am',
		driver_phone_no: '000-000-0002',
	},
	{
		id: '5f832341daae2cc0af8610a4',
		status: 'pending' as EmergencyStateId,
		car_name: 'Car03',
		time: '3.00 am',
		driver_phone_no: '000-000-0003',
	},
	{
		id: '5f832341ef54dda7b80930da',
		status: 'pending' as EmergencyStateId,
		car_name: 'Car04',
		time: '4.00 am',
		driver_phone_no: '000-000-0004',
	},
];

export const MockedInProgressEmergency = [
	{
		id: '5f832341c0b0131eeade1b00',
		status: 'inProgress' as EmergencyStateId,
		car_name: 'Car05',
		time: '5.00 am',
		driver_phone_no: '000-000-0005',
	},
];

export const MockedCompleteEmergency = [
	{
		id: '5f832341c0b0131eeade1b01',
		status: 'complete' as EmergencyStateId,
		car_name: 'Car09',
		time: '9.00 am',
		driver_phone_no: '000-000-0009',
	},
];
