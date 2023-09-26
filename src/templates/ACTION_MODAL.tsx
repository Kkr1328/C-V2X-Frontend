import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/COMMON';

export const CarActionModalTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Car01',
		row: 1,
	},
	{
		label: INPUT_LABEL.LICENSE_PLATE,
		type: 'TextField',
		placeholder: 'ex. กข 1234',
		row: 1,
	},
	{
		label: INPUT_LABEL.MODEL,
		type: 'TextField',
		placeholder: 'ex. ABC Model',
		row: 2,
	},
	{
		label: INPUT_LABEL.DRIVER,
		type: 'Select',
		placeholder: 'ex. สมชาย สวัสดี',
		row: 2,
	},
];

export const DriverActionModalTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.FIRST_NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย',
		row: 1,
	},
	{
		label: INPUT_LABEL.LAST_NAME,
		type: 'TextField',
		placeholder: 'ex. สวัสดี',
		row: 1,
	},
	{
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
		row: 2,
	},
	{
		label: INPUT_LABEL.PASSWORD,
		type: 'TextField',
		placeholder: 'ex. P@ssw0rd',
		row: 2,
	},
	{
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 0993336666',
		row: 3,
	},
];

export const CameraActionModalTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
		row: 1,
	},
	{
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
		row: 2,
	},
	{
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
		row: 2,
	},
];

export const RSUActionModalTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
		row: 1,
	},
	{
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'TextField',
		placeholder: 'ex. 50',
		row: 1,
	},
];
