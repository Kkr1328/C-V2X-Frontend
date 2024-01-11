import { HEARTBEAT_TABLE_LABEL } from '@/constants/LABEL';
import { TableHeaderProps } from '@/types/ENTITY';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';

export const CarsHeartbeatTableTemplate: TableHeaderProps<ICarHeartbeat>[] = [
	{
		id: 'name',
		label: HEARTBEAT_TABLE_LABEL.CAR,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'status',
		label: HEARTBEAT_TABLE_LABEL.STATUS,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'front_cam',
		label: HEARTBEAT_TABLE_LABEL.FRONT_CAM,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'back_cam',
		label: HEARTBEAT_TABLE_LABEL.BACK_CAM,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'heartbeat_action',
		label: HEARTBEAT_TABLE_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];

export const RSUsHeartbeatTableTemplate: TableHeaderProps<IRSUHeartbeat>[] = [
	{
		id: 'name',
		label: HEARTBEAT_TABLE_LABEL.RSU,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'status',
		label: HEARTBEAT_TABLE_LABEL.STATUS,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'heartbeat_action',
		label: HEARTBEAT_TABLE_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];
