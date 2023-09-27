import { INPUT_LABEL } from '@/constants/LABEL';
import {
	TableHeaderProps,
	CarsTableProps,
	DriversTableProps,
	CamerasTableProps,
	RSUsTableProps,
} from '@/types/ENTITY_TABLE';

export const CarsTableTemplate: TableHeaderProps<CarsTableProps>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'cameras',
		label: INPUT_LABEL.CAMERAS,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'driver',
		label: INPUT_LABEL.DRIVER,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: INPUT_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];

export const DriversTableTemplate: TableHeaderProps<DriversTableProps>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: INPUT_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];

export const CamerasTableTemplate: TableHeaderProps<CamerasTableProps>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'car',
		label: INPUT_LABEL.CAR,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: INPUT_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];

export const RSUsTableTemplate: TableHeaderProps<RSUsTableProps>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'rec_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		align: 'left',
		isSorted: true,
	},
	{
		id: 'action',
		label: INPUT_LABEL.ACTION,
		align: 'center',
		isSorted: false,
	},
];
