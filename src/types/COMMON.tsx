export type Position = 'Front' | 'Back' | 'Left' | 'Right';

export type Emergency = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';
export type EmergencyColumn = 'pending' | 'inProgress' | 'complete';

export const StatusDotType = [
	'Active',
	'Warning',
	'Emergency',
	'Inactive',
	'Missing',
] as const;

export type InputType =
	| 'NoSpace'
	| 'Number'
	| 'Coordination'
	| 'Password'
	| 'ConfirmedPassword'
	| 'PhoneNo'
	| 'Position'
	| 'Emergency';

export type InputError<T> = {
	[key in keyof T]: string;
};

export type OptionTemplate = {
	id: string;
	option: Option[];
};

export type Option = {
	value: string;
	label: string;
};

export interface InputFieldProp<T> {
	id: keyof T;
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	isRequired?: boolean;
	inputType?: InputType;
	isPassword?: boolean;
	isSpan?: boolean;
}

export interface IGetPanopticRequest {
	car_id: string;
	camera_id: string;
	date: string;
}
