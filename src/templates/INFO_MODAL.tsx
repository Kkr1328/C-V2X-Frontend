// const
import { INPUT_LABEL } from '@/constants/LABEL';
// types
import { InputFieldProp } from '@/types/COMMON';
import { ICamera } from '@/types/models/camera.model';
import { ICarInfo } from '@/types/models/car.model';
import { IDriver } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';

export const CarInfoModalTemplate: InputFieldProp<ICarInfo>[] = [
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
	},
	{
		id: 'driver',
		label: INPUT_LABEL.DRIVER,
		type: 'TextField',
		isSpan: true,
	},
	{
		id: 'front_cam_name',
		label: INPUT_LABEL.CAMERA,
		type: 'TextField',
	},
	{
		id: 'front_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
	},
	{
		id: 'back_cam_name',
		label: INPUT_LABEL.CAMERA,
		type: 'TextField',
	},
	{
		id: 'back_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
	},
	{
		id: 'left_cam_name',
		label: INPUT_LABEL.CAMERA,
		type: 'TextField',
	},
	{
		id: 'left_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
	},
	{
		id: 'right_cam_name',
		label: INPUT_LABEL.CAMERA,
		type: 'TextField',
	},
	{
		id: 'right_cam_position',
		label: INPUT_LABEL.POSITION,
		type: 'TextField',
	},
];

export const DriverInfoModalTemplate: InputFieldProp<IDriver>[] = [
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
	},
];

export const CameraInfoModalTemplate: InputFieldProp<ICamera>[] = [
	{
		id: 'car',
		label: INPUT_LABEL.CAR,
		type: 'Select',
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
	},
];

export const RSUInfoModalTemplate: InputFieldProp<IRSU>[] = [
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		isSpan: true,
	},
];
