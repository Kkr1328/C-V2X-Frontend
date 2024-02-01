import { INPUT_LABEL } from '@/constants/LABEL';
import { IGetPanopticRequest, InputFieldProp } from '@/types/COMMON';
import { IGetCarsRequest } from '@/types/models/car.model';
import { IGetCamerasRequest } from '@/types/models/camera.model';
import { IGetDriversRequest } from '@/types/models/driver.model';
import { IGetRSUsRequest } from '@/types/models/rsu.model';

export const PanopticFilterTemplate: InputFieldProp<IGetPanopticRequest>[] = [
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
	},
	{
		id: 'camera_id',
		label: INPUT_LABEL.CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
	},
];

export const CarFilterTemplate: InputFieldProp<IGetCarsRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Car01',
	},
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		placeholder: 'ex. กข 1234',
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		placeholder: 'ex. ABC Model',
	},
	{
		id: 'front_cam_id',
		label: INPUT_LABEL.FRONT_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
	},
	{
		id: 'back_cam_id',
		label: INPUT_LABEL.BACK_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
	},
	{
		id: 'left_cam_id',
		label: INPUT_LABEL.LEFT_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
	},
	{
		id: 'right_cam_id',
		label: INPUT_LABEL.RIGHT_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
	},
	{
		id: 'driver_id',
		label: INPUT_LABEL.DRIVER,
		type: 'Select',
		placeholder: 'ex. สมชาย สวัสดี',
	},
];

export const DriverFilterTemplate: InputFieldProp<IGetDriversRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
	},
	{
		id: 'first_name',
		label: INPUT_LABEL.FIRST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
	},
	{
		id: 'last_name',
		label: INPUT_LABEL.LAST_NAME,
		type: 'TextField',
		placeholder: 'ex. สวัสดี',
	},
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 0993336666',
	},
];

export const CameraFilterTemplate: InputFieldProp<IGetCamerasRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
	},
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
	},
];

export const RSUFilterTemplate: InputFieldProp<IGetRSUsRequest>[] = [
	{
		id: 'id',
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
	},
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
	},
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		placeholder: '50',
	},
];
