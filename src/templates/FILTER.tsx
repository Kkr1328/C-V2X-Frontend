import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/COMMON';
import { IGetCarsRequest } from '@/types/models/car.model';
import { IGetCamerasRequest } from '@/types/models/camera.model';
import { IGetDriversRequest } from '@/types/models/driver.model';
import { IGetRSUsRequest } from '@/types/models/rsu.model';

export const CarFilterTemplate: InputFieldProp<IGetCarsRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Car01',
		row: 1,
	},
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		placeholder: 'ex. กข 1234',
		row: 1,
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		placeholder: 'ex. ABC Model',
		row: 1,
	},
	{
		id: 'front_cam_id',
		label: INPUT_LABEL.FRONT_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
		row: 2,
	},
	{
		id: 'back_cam_id',
		label: INPUT_LABEL.BACK_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
		row: 2,
	},
	{
		id: 'driver_id',
		label: INPUT_LABEL.DRIVER,
		type: 'Select',
		placeholder: 'ex. สมชาย สวัสดี',
		row: 2,
	},
];

export const DriverFilterTemplate: InputFieldProp<IGetDriversRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		id: 'first_name',
		label: INPUT_LABEL.FIRST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
		row: 1,
	},
	{
		id: 'last_name',
		label: INPUT_LABEL.LAST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
		row: 1,
	},
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
		row: 1,
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 0993336666',
		row: 2,
	},
];

export const CameraFilterTemplate: InputFieldProp<IGetCamerasRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
		row: 1,
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
		row: 1,
	},
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
		row: 1,
	},
];

export const RSUFilterTemplate: InputFieldProp<IGetRSUsRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
		row: 1,
	},
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		placeholder: '50',
		row: 1,
	},
];
