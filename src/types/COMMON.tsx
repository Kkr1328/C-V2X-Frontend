export type Position = 'Front' | 'Back';

export type Emergency = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export const StatusDotType = [
	'Active',
	'Warning',
	'Emergency',
	'Inactive',
	'Missing',
] as const;

export interface InputFieldProp<T> {
	id: keyof T;
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	isRequired?: boolean;
	isPassword?: boolean;
	row: number;
}
