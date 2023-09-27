export type Position = 'Front' | 'Back';

export interface InputFieldProp<T> {
	id: keyof T;
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	row: number;
}
