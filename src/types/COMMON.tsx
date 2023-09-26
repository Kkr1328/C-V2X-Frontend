export type Position = 'Front' | 'Back';

export interface InputFieldProp {
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	row: number;
}
