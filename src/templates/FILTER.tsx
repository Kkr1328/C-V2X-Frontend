import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/COMMON';
import { IGetCarsRequest } from '@/types/models/car.model';
import { IGetCamerasRequest } from '@/types/models/camera.model';
import { IGetDriversRequest } from '@/types/models/driver.model';
import { IGetRSUsRequest } from '@/types/models/rsu.model';

export function CarFilterTemplate(
	fieldPerRow: number
): InputFieldProp<IGetCarsRequest>[] {
	return [
		{
			id: 'id',
			label: INPUT_LABEL.ID,
			type: 'TextField',
			placeholder: 'ex. ID01',
			row: Math.ceil(1 / fieldPerRow),
		},
		{
			id: 'name',
			label: INPUT_LABEL.NAME,
			type: 'TextField',
			placeholder: 'ex. Car01',
			row: Math.ceil(2 / fieldPerRow),
		},
		{
			id: 'license_plate',
			label: INPUT_LABEL.LICENSE_PLATE,
			type: 'TextField',
			placeholder: 'ex. กข 1234',
			row: Math.ceil(3 / fieldPerRow),
		},
		{
			id: 'model',
			label: INPUT_LABEL.MODEL,
			type: 'TextField',
			placeholder: 'ex. ABC Model',
			row: Math.ceil(4 / fieldPerRow),
		},
		{
			id: 'front_cam_id',
			label: INPUT_LABEL.FRONT_CAMERA,
			type: 'Select',
			placeholder: 'ex. Camera01',
			row: Math.ceil(5 / fieldPerRow),
		},
		{
			id: 'back_cam_id',
			label: INPUT_LABEL.BACK_CAMERA,
			type: 'Select',
			placeholder: 'ex. Camera01',
			row: Math.ceil(6 / fieldPerRow),
		},
		{
			id: 'left_cam_id',
			label: INPUT_LABEL.LEFT_CAMERA,
			type: 'Select',
			placeholder: 'ex. Camera01',
			row: Math.ceil(7 / fieldPerRow),
		},
		{
			id: 'right_cam_id',
			label: INPUT_LABEL.RIGHT_CAMERA,
			type: 'Select',
			placeholder: 'ex. Camera01',
			row: Math.ceil(8 / fieldPerRow),
		},
		{
			id: 'driver_id',
			label: INPUT_LABEL.DRIVER,
			type: 'Select',
			placeholder: 'ex. สมชาย สวัสดี',
			row: Math.ceil(9 / fieldPerRow),
		},
	];
}

export function DriverFilterTemplate(
	fieldPerRow: number
): InputFieldProp<IGetDriversRequest>[] {
	return [
		{
			id: 'id',
			label: INPUT_LABEL.ID,
			type: 'TextField',
			placeholder: 'ex. ID01',
			row: Math.ceil(1 / fieldPerRow),
		},
		{
			id: 'first_name',
			label: INPUT_LABEL.FIRST_NAME,
			type: 'TextField',
			placeholder: 'ex. สมชาย',
			row: Math.ceil(2 / fieldPerRow),
		},
		{
			id: 'last_name',
			label: INPUT_LABEL.LAST_NAME,
			type: 'TextField',
			placeholder: 'ex. สมชาย',
			row: Math.ceil(3 / fieldPerRow),
		},
		{
			id: 'username',
			label: INPUT_LABEL.USERNAME,
			type: 'TextField',
			placeholder: 'ex. somchai',
			row: Math.ceil(4 / fieldPerRow),
		},
		{
			id: 'phone_no',
			label: INPUT_LABEL.PHONE_NO,
			type: 'TextField',
			placeholder: 'ex. 0993336666',
			row: Math.ceil(5 / fieldPerRow),
		},
	];
}

export function CameraFilterTemplate(
	fieldPerRow: number
): InputFieldProp<IGetCamerasRequest>[] {
	return [
		{
			id: 'id',
			label: INPUT_LABEL.ID,
			type: 'TextField',
			placeholder: 'ex. ID01',
			row: Math.ceil(1 / fieldPerRow),
		},
		{
			id: 'name',
			label: INPUT_LABEL.NAME,
			type: 'TextField',
			placeholder: 'ex. Camera01',
			row: Math.ceil(2 / fieldPerRow),
		},
		{
			id: 'position',
			label: INPUT_LABEL.POSITION,
			type: 'Select',
			placeholder: 'ex. Front',
			row: Math.ceil(3 / fieldPerRow),
		},
		{
			id: 'car_id',
			label: INPUT_LABEL.CAR,
			type: 'Select',
			placeholder: 'ex. Car01',
			row: Math.ceil(4 / fieldPerRow),
		},
	];
}

export function RSUFilterTemplate(
	fieldPerRow: number
): InputFieldProp<IGetRSUsRequest>[] {
	return [
		{
			id: 'id',
			label: INPUT_LABEL.ID,
			type: 'TextField',
			placeholder: 'ex. ID01',
			row: Math.ceil(1 / fieldPerRow),
		},
		{
			id: 'name',
			label: INPUT_LABEL.NAME,
			type: 'TextField',
			placeholder: 'ex. RSU01',
			row: Math.ceil(2 / fieldPerRow),
		},
		{
			id: 'recommended_speed',
			label: INPUT_LABEL.RECOMENDED_SPEED,
			type: 'TextField',
			placeholder: '50',
			row: Math.ceil(3 / fieldPerRow),
		},
	];
}
