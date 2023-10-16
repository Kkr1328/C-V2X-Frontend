'use client';

import React from 'react';

import { Stack } from '@mui/material';

import SelectCV2X from '@/components/common/SelectCV2X';
import TextFieldCV2X from '@/components/common/TextFieldCV2X';

import { InputFieldProp } from '@/types/COMMON';

interface ModalInputsProp<T> {
	template: InputFieldProp<T>[];
	data: T;
	onDataChange: React.Dispatch<React.SetStateAction<T>>;
	options?: any;
	isReadOnly?: boolean;
	isLoading?: boolean;
}

export default function ModalInputs<T>(props: ModalInputsProp<T>) {
	const maxRow = Math.max(...props.template.map((item) => item.row), 0);

	const getSearch = (id: keyof T) => {
		if (props.data) {
			return props.data[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof T, value: string) => {
		props.onDataChange({
			...props.data,
			[id]: value,
		} as T);
		console.log(props.data);
	};

	return (
		<Stack className="w-full gap-16">
			{Array.from({ length: maxRow }, (_, index) => (
				<Stack key={index} direction="row" className="gap-16">
					{props.template
						.filter((inputField) => inputField.row === index + 1)
						.map((inputField) =>
							props.isReadOnly || inputField.type === 'TextField' ? (
								<TextFieldCV2X
									key={inputField.label}
									title={inputField.label}
									placeholder={inputField.placeholder}
									isRequired={inputField.isRequired}
									isPassword={inputField.isPassword}
									isReadOnly={props.isReadOnly}
									isLoading={props.isLoading}
									value={getSearch(inputField.id)}
									onChange={(event) =>
										handleSearchChange(inputField.id, event.target.value)
									}
								/>
							) : (
								inputField.type === 'Select' && (
									<SelectCV2X
										key={inputField.label}
										title={inputField.label}
										placeholder={inputField.placeholder}
										isRequired={inputField.isRequired}
										isLoading={props.isLoading}
										value={
											props.options
												.filter((item: any) => item.id === inputField.id)[0]
												.option.find(
													(option: any) =>
														option.value === getSearch(inputField.id)
												) || null
										}
										onChange={(_, value) => {
											value && handleSearchChange(inputField.id, value.value);
										}}
										options={
											props.options.filter(
												(item: any) => item.id === inputField.id
											)[0].option
										}
									/>
								)
							)
						)}
				</Stack>
			))}
		</Stack>
	);
}
