import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/COMMON';
import {
	CamerasProps,
	CarsProps,
	DriversProps,
	RSUsProps,
} from '@/types/ENTITY';

export const CarInfoModalTemplate: InputFieldProp<CarsProps>[] = [
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		row: 1,
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		row: 1,
	},
	{
		id: 'driver_id',
		label: INPUT_LABEL.DRIVER,
		type: 'TextField',
		row: 2,
	},
	{
		id: 'front_camera',
		label: INPUT_LABEL.CAMERAS,
		type: 'TextField',
		row: 3,
	},
	{
		id: 'front_camera',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		row: 3,
	},
];

export const DriverInfoModalTemplate: InputFieldProp<DriversProps>[] = [
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		row: 1,
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		row: 1,
	},
];

export const CameraInfoModalTemplate: InputFieldProp<CamerasProps>[] = [
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		row: 1,
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		row: 1,
	},
];

export const RSUInfoModalTemplate: InputFieldProp<RSUsProps>[] = [
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		row: 1,
	},
];
