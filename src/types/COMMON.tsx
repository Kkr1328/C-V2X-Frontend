export type Position = 'Front' | 'Back';

export type Emergency = 'PENDING' | 'IN PROGRESS' | 'COMPLETE';

export interface InputFieldProp<T> {
	id: keyof T;
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	row: number;
}
