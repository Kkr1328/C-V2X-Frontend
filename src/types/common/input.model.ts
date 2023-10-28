export interface InputFieldProp<T> {
	id: keyof T;
	label: string;
	type: 'TextField' | 'Select';
	placeholder?: string;
	isRequired?: boolean;
	isPassword?: boolean;
	row: number;
}
