'use client';

import React, { useState } from 'react';

import { Stack } from '@mui/material';

import SelectCV2X, { SelectOption } from '@/components/common/SelectCV2X';
import TextFieldCV2X from '@/components/common/TextFieldCV2X';

import { InputFieldProp } from '@/types/COMMON';

interface ModalInputsProp<T> {
	template: InputFieldProp<T>[];
	initiateValue?: T;
	isReadOnly?: boolean;
	isLoading?: boolean;
}

const options = [
	{
		value: 'Front',
		label: 'Front',
	},
	{
		value: 'Back',
		label: 'Back',
	},
];

export default function ModalInputs<T>(props: ModalInputsProp<T>) {
	const maxRow = Math.max(...props.template.map((item) => item.row), 0);
	const defaultData = props.template.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as T[keyof T] }),
		{} as T
	);

	const [data, setData] = useState<T>(props.initiateValue || defaultData);

	const getSearch = (id: keyof T) => {
		if (data) {
			return data[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof T, value: string) => {
		setData({
			...data,
			[id]: value,
		} as T);
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
											options.find(
												(option) => option.value === getSearch(inputField.id)
											) || null
										}
										onChange={(_, value) => {
											value && handleSearchChange(inputField.id, value.value);
										}}
										options={options}
									/>
								)
							)
						)}
				</Stack>
			))}
		</Stack>
	);
}
