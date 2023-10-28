import { INPUT_LABEL } from '@/constants/LABEL';
import { ICar } from '@/types/models/car.model';
import { ICamera } from '@/types/models/camera.model';
import { IDriverInput } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';
import { InputFieldProp } from '@/types/common/input.model';

export const CarActionModalTemplate: InputFieldProp<ICar>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Car01',
		isRequired: true,
		row: 1,
	},
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		placeholder: 'ex. กข 1234',
		isRequired: true,
		row: 1,
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		placeholder: 'ex. ABC Model',
		isRequired: true,
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

export const DriverActionModalTemplate: InputFieldProp<IDriverInput>[] = [
	{
		id: 'first_name',
		label: INPUT_LABEL.FIRST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
		isRequired: true,
		row: 1,
	},
	{
		id: 'last_name',
		label: INPUT_LABEL.LAST_NAME,
		type: 'TextField',
		placeholder: 'ex. สวัสดี',
		isRequired: true,
		row: 1,
	},
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
		isRequired: true,
		row: 2,
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 0993336666',
		isRequired: true,
		row: 2,
	},
	{
		id: 'password',
		label: INPUT_LABEL.PASSWORD,
		type: 'TextField',
		placeholder: 'ex. P@ssw0rd',
		isRequired: true,
		isPassword: true,
		row: 3,
	},
	{
		id: 'confirmed_password',
		label: INPUT_LABEL.CONFIRMED_PASSWORD,
		type: 'TextField',
		placeholder: 'ex. P@ssw0rd',
		isRequired: true,
		isPassword: true,
		row: 4,
	},
];

export const CameraActionModalTemplate: InputFieldProp<ICamera>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
		isRequired: true,
		row: 1,
	},
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
		isRequired: true,
		row: 2,
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
		isRequired: true,
		row: 2,
	},
];

export const RSUActionModalTemplate: InputFieldProp<IRSU>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
		isRequired: true,
		row: 1,
	},
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		placeholder: 'ex. 50',
		isRequired: true,
		row: 1,
	},
];
