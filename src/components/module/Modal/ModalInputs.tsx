'use client';
// react
import { Dispatch, SetStateAction } from 'react';
// material ui
import { Stack } from '@mui/material';
// components
import SelectCV2X from '@/components/common/SelectCV2X';
import TextFieldCV2X from '@/components/common/TextFieldCV2X';
// types
import {
	InputFieldProp,
	OptionTemplate,
	Option,
	InputError,
} from '@/types/COMMON';

export interface ModalInputsProp<T> {
	template: InputFieldProp<T>[];
	data: T;
	onDataChange: Dispatch<SetStateAction<T>>;
	options?: OptionTemplate[];
	isReadOnly?: boolean;
	isLoading?: boolean;
	error?: InputError<T>;
	resetError?: (_: keyof T) => void;
}

export default function ModalInputs<T>(props: ModalInputsProp<T>) {
	const maxRow = Math.max(...props.template.map((item) => item.row), 0);

	const getData = (id: keyof T) => {
		return props.data
			? (props.data[id] as string) ?? (id === 'driver' ? '-' : '')
			: '';
	};

	const handleDataChange = (id: keyof T, value: string) => {
		props.onDataChange({
			...props.data,
			[id]: value,
		} as T);
	};

	const useTextField = (inputField: InputFieldProp<T>) => {
		return (
			(props.isReadOnly || inputField.type === 'TextField') &&
			((inputField.id !== 'front_cam_name' &&
				inputField.id !== 'front_cam_position' &&
				inputField.id !== 'back_cam_name' &&
				inputField.id !== 'back_cam_position') ||
				getData(inputField.id) !== '')
		);
	};

	const useSelect = (inputField: InputFieldProp<T>) => {
		return inputField.type === 'Select';
	};

	const getOption = (inputField: InputFieldProp<T>): Option[] => {
		return (
			props.options?.filter(
				(item: OptionTemplate) => item.id === inputField.id
			)[0].option ?? []
		);
	};

	return (
		<Stack className="w-full gap-16 flex">
			{Array.from({ length: maxRow }, (_, index) => (
				<Stack key={index} direction="row" className="gap-16">
					{props.template
						.filter((inputField) => inputField.row === index + 1)
						.map((inputField) =>
							useTextField(inputField) ? (
								<TextFieldCV2X
									{...props}
									{...inputField}
									key={inputField.label}
									title={inputField.label}
									value={getData(inputField.id)}
									onChange={(event) => {
										props.resetError?.(inputField.id);
										handleDataChange(inputField.id, event.target.value);
									}}
									isError={props.error && props.error?.[inputField.id] !== ''}
									helperMessage={props.error && props.error?.[inputField.id]}
								/>
							) : (
								useSelect(inputField) && (
									<SelectCV2X
										{...props}
										{...inputField}
										key={inputField.label}
										title={inputField.label}
										value={
											getOption(inputField).find(
												(option: Option) =>
													option.value === getData(inputField.id)
											) || null
										}
										onChange={(_, value) => {
											props.resetError?.(inputField.id);
											handleDataChange(inputField.id, value ? value.value : '');
										}}
										options={getOption(inputField)}
										isError={props.error && props.error?.[inputField.id] !== ''}
										helperMessage={props.error && props.error?.[inputField.id]}
									/>
								)
							)
						)}
				</Stack>
			))}
		</Stack>
	);
}
