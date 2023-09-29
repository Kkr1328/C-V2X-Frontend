import { INPUT_LABEL } from '@/constants/LABEL';
import {
	CamerasProps,
	CarsProps,
	DriversProps,
	RSUsProps,
	TableHeaderProps,
} from '@/types/ENTITY';

export const CarsTableTemplate: TableHeaderProps<CarsProps>[] = [
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
		id: 'driver_id',
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

export const DriversTableTemplate: TableHeaderProps<DriversProps>[] = [
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

export const CamerasTableTemplate: TableHeaderProps<CamerasProps>[] = [
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
		id: 'car_id',
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

export const RSUsTableTemplate: TableHeaderProps<RSUsProps>[] = [
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
