import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/common/input.model';
import { ICamera } from '@/types/models/camera.model';
import { ICarInfo } from '@/types/models/car.model';
import { IDriver } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';

export const CarInfoModalTemplate: InputFieldProp<ICarInfo>[] = [
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
		id: 'driver',
		label: INPUT_LABEL.DRIVER,
		type: 'TextField',
		row: 2,
	},
	{
		id: 'front_cam_name',
		label: INPUT_LABEL.CAMERAS,
		type: 'TextField',
		row: 3,
	},
	{
		id: 'front_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
		row: 3,
	},
	{
		id: 'back_cam_name',
		label: INPUT_LABEL.CAMERAS,
		type: 'TextField',
		row: 4,
	},
	{
		id: 'back_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
		row: 4,
	},
];

export const DriverInfoModalTemplate: InputFieldProp<IDriver>[] = [
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

export const CameraInfoModalTemplate: InputFieldProp<ICamera>[] = [
	{
		id: 'car',
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

export const RSUInfoModalTemplate: InputFieldProp<IRSU>[] = [
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		row: 1,
	},
];
