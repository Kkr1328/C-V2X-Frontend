import { INPUT_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/COMMON';

export const CarFilterTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
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
		row: 1,
	},
	{
		label: INPUT_LABEL.FRONT_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
		row: 2,
	},
	{
		label: INPUT_LABEL.BACK_CAMERA,
		type: 'Select',
		placeholder: 'ex. Camera01',
		row: 2,
	},
	{
		label: INPUT_LABEL.DRIVER,
		type: 'Select',
		placeholder: 'ex. สมชาย สวัสดี',
		row: 2,
	},
];

export const DriverFilterTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. สมชาย สวัสดี',
		row: 1,
	},
	{
		label: INPUT_LABEL.USERNAME,
		type: 'TextField',
		placeholder: 'ex. somchai',
		row: 1,
	},
	{
		label: INPUT_LABEL.PHONE_NO,
		type: 'TextField',
		placeholder: 'ex. 0993336666',
		row: 1,
	},
];

export const CameraFilterTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. Camera01',
		row: 1,
	},
	{
		label: INPUT_LABEL.POSITION,
		type: 'Select',
		placeholder: 'ex. Front',
		row: 1,
	},
	{
		label: INPUT_LABEL.CAR,
		type: 'Select',
		placeholder: 'ex. Car01',
		row: 1,
	},
];

export const RSUFilterTemplate: InputFieldProp[] = [
	{
		label: INPUT_LABEL.ID,
		type: 'TextField',
		placeholder: 'ex. ID01',
		row: 1,
	},
	{
		label: INPUT_LABEL.NAME,
		type: 'TextField',
		placeholder: 'ex. RSU01',
		row: 1,
	},
	{
		label: INPUT_LABEL.RECOMENDED_SPEED,
		type: 'Select',
		placeholder: '50',
		row: 1,
	},
];
