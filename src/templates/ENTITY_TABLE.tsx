import { INPUT_LABEL } from '@/constants/LABEL';
import { TableHeaderProps } from '@/types/ENTITY';
import { ICar } from '@/types/models/car.model';
import { ICamera } from '@/types/models/camera.model';
import { IDriver } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';

export const CarsTableTemplate: TableHeaderProps<ICar>[] = [
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

export const DriversTableTemplate: TableHeaderProps<IDriver>[] = [
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

export const CamerasTableTemplate: TableHeaderProps<ICamera>[] = [
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

export const RSUsTableTemplate: TableHeaderProps<IRSU>[] = [
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
		id: 'recommended_speed',
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
