// const
import { INPUT_LABEL } from '@/constants/LABEL';
// types
import { InputFieldProp } from '@/types/COMMON';
import { ICar } from '@/types/models/car.model';
import { ICamera } from '@/types/models/camera.model';
import { IDriverInput } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';

export const CarActionModalTemplate: InputFieldProp<ICar>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Car01',
		isRequired: true,
		inputType: 'NoSpace',
	},
	{
		id: 'license_plate',
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		placeholder: 'ex. กข 1234',
		isRequired: true,
	},
	{
		id: 'model',
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		placeholder: 'ex. ABC Model',
		isRequired: true,
	},
	{
		id: 'driver_id',
		label: INPUT_LABEL.DRIVER,
		type: 'Select',
		placeholder: 'ex. สมชาย สวัสดี',
	},
];

export const DriverActionModalTemplate: InputFieldProp<IDriverInput>[] = [
	{
		id: 'first_name',
		label: INPUT_LABEL.FIRST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
		isRequired: true,
		inputType: 'NoSpace',
	},
	{
		id: 'last_name',
		label: INPUT_LABEL.LAST_NAME,
		type: 'TextField',
		placeholder: 'ex. สวัสดี',
		isRequired: true,
		inputType: 'NoSpace',
	},
	{
		id: 'username',
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
		isRequired: true,
		inputType: 'NoSpace',
	},
	{
		id: 'phone_no',
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 099-333-6666',
		isRequired: true,
		inputType: 'PhoneNo',
	},
	{
		id: 'password',
		label: INPUT_LABEL.PASSWORD,
		type: 'TextField',
		placeholder: 'ex. P@ssw0rd',
		isRequired: true,
		inputType: 'Password',
		isPassword: true,
		isSpan: true,
	},
	{
		id: 'confirmed_password',
		label: INPUT_LABEL.CONFIRMED_PASSWORD,
		type: 'TextField',
		placeholder: 'ex. P@ssw0rd',
		isRequired: true,
		inputType: 'ConfirmedPassword',
		isPassword: true,
		isSpan: true,
	},
];

export const CameraActionModalTemplate: InputFieldProp<ICamera>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
		isRequired: true,
		inputType: 'NoSpace',
		isSpan: true,
	},
	{
		id: 'car_id',
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
		isRequired: true,
	},
	{
		id: 'position',
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
		isRequired: true,
	},
];

export const RSUActionModalTemplate: InputFieldProp<IRSU>[] = [
	{
		id: 'name',
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
		isRequired: true,
		inputType: 'NoSpace',
	},
	{
		id: 'recommended_speed',
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		placeholder: 'ex. 50',
		isRequired: true,
		inputType: 'Number',
	},
];
