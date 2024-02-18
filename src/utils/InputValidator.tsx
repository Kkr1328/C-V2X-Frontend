// types
import { InputFieldProp } from '@/types/COMMON';

const noSpaceRegex = /^\S*$/;
const numberRegex = /^[0-9]+$/;
const coordinationRegex = /^-?\d+(?:\.\d+)?$/;
const passwordRegex = /^(?=\S{8,}$).*/;
const phoneNoRegex = /^(\d{3}-\d{3}-\d{4})$/;

export function InputValidator<T>(
	fieldTemplate: InputFieldProp<T>,
	data: string,
	password?: string
) {
	const label = fieldTemplate.label.split('(')[0];

	if (fieldTemplate.isRequired && data === '') {
		return `${label} is required`;
	}

	switch (fieldTemplate.inputType) {
		case 'NoSpace':
			if (!noSpaceRegex.test(data)) {
				return `${label} should not contain spaces`;
			}
			break;

		case 'Number':
			if (!numberRegex.test(data)) {
				return `${label} should be a valid number`;
			}
			break;

		case 'Coordination':
			if (!coordinationRegex.test(data)) {
				return `${label} should be a coordinate number`;
			}
			break;

		case 'Password':
			if (!noSpaceRegex.test(data)) {
				return `${label} should not contain spaces`;
			} else if (!passwordRegex.test(data)) {
				return `${label} should be at least 8 characters`;
			}
			break;

		case 'ConfirmedPassword':
			if (password && data !== password) {
				return `${label} should match the Password`;
			}
			break;

		case 'PhoneNo':
			if (!phoneNoRegex.test(data)) {
				return `${label} should be xxx-xxx-xxxx format`;
			}
			break;
	}

	return '';
}
