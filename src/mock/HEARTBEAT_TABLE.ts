import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';

export const MockedCarsHeartbeatTableContent: ICarHeartbeat[] = [
	{
		id: '1',
		name: 'Car01',
		status: 'Active',
		front_cam: 'Active',
		back_cam: 'Active',
	},
	{
		id: '2',
		name: 'Car02',
		status: 'Active',
		front_cam: 'Missing',
		back_cam: 'Active',
	},
	{
		id: '3',
		name: 'Car03',
		status: 'Emergency',
		front_cam: 'Active',
		back_cam: 'Inactive',
	},
	{
		id: '4',
		name: 'Car04',
		status: 'Active',
		front_cam: 'Active',
		back_cam: 'Active',
	},
	{
		id: '5',
		name: 'Car05',
		status: 'Warning',
		front_cam: 'Active',
		back_cam: 'Active',
	},
	{
		id: '6',
		name: 'Car06',
		status: 'Emergency',
		front_cam: 'Inactive',
		back_cam: 'Inactive',
	},
	{
		id: '7',
		name: 'Car07',
		status: 'Active',
		front_cam: 'Active',
		back_cam: 'Active',
	},
	{
		id: '8',
		name: 'Car08',
		status: 'Active',
		front_cam: 'Active',
		back_cam: 'Active',
	},
];

export const MockedRSUsHeartbeatTableContent: IRSUHeartbeat[] = [
	{
		id: '1',
		name: 'RSU01',
		status: 'Active',
	},
	{
		id: '2',
		name: 'RSU02',
		status: 'Active',
	},
	{
		id: '3',
		name: 'RSU03',
		status: 'Inactive',
	},
	{
		id: '4',
		name: 'RSU04',
		status: 'Active',
	},
	{
		id: '5',
		name: 'RSU05',
		status: 'Missing',
	},
	{
		id: '6',
		name: 'RSU06',
		status: 'Inactive',
	},
	{
		id: '7',
		name: 'RSU07',
		status: 'Active',
	},
	{
		id: '8',
		name: 'RSU08',
		status: 'Active',
	},
];
