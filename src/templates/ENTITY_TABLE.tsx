import {
	TableHeaderProps,
	CarsTableRowProps,
	DriversTableRowProps,
	CamerasTableRowProps,
	RSUsTableRowProps,
} from '@/types/ENTITY_TABLE';

export const CarsTableTemplate: TableHeaderProps<CarsTableRowProps>[] = [
	{
		id: 'id',
		label: 'ID',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: 'Name',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'license_plate',
		label: 'License Plate',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'model',
		label: 'Model',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'camera',
		label: 'Cameras',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'driver',
		label: 'Driver',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: 'Action',
		align: 'center',
		isSorted: false,
	},
];

export const DriversTableTemplate: TableHeaderProps<DriversTableRowProps>[] = [
	{
		id: 'id',
		label: 'ID',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: 'Name',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'username',
		label: 'Username',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'phone_no',
		label: 'Phone NO.',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: 'Action',
		align: 'center',
		isSorted: false,
	},
];

export const CamerasTableTemplate: TableHeaderProps<CamerasTableRowProps>[] = [
	{
		id: 'id',
		label: 'ID',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: 'Name',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'position',
		label: 'Position',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'car',
		label: 'Car',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: 'Action',
		align: 'center',
		isSorted: false,
	},
];

export const RSUsTableTemplate: TableHeaderProps<RSUsTableRowProps>[] = [
	{
		id: 'id',
		label: 'ID',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: 'Name',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'rec_speed',
		label: 'Recommended speed (km/h)',
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: 'Action',
		align: 'center',
		isSorted: false,
	},
];
