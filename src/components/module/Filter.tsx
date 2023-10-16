'use client';

import { Fragment, useState } from 'react';

import { Stack } from '@mui/material';

import TextFieldCV2X from '../common/TextFieldCV2X';
import SelectCV2X from '../common/SelectCV2X';
import ButtonCV2X from '../common/ButtonCV2X';

import { InputFieldProp } from '@/types/COMMON';
import { BUTTON_LABEL } from '@/constants/LABEL';

interface FilterProp<T> {
	template: InputFieldProp<T>[];
	handleSubmitSearch: (search: T) => void;
	options?: any;
}

export default function Filter<T>(props: FilterProp<T>) {
	const defaultSearch = props.template.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as T[keyof T] }),
		{} as T
	);

	const [search, setSearch] = useState<T>(defaultSearch);

	const getSearch = (id: keyof T) => {
		if (search) {
			return search[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof T, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as T);
	};
	const handleClearSearch = () => {
		setSearch(defaultSearch);
	};

	const maxRow =
		Math.max(...props.template.map((item) => item.row), 0) +
		Number(props.template.length % 4 === 0);

	return (
		<Stack className="w-full gap-8">
			{Array.from({ length: maxRow }, (_, index) => (
				<Stack
					key={`row ${index}`}
					direction="row"
					className="gap-16 items-end"
				>
					{props.template
						.filter((inputField) => inputField.row === index + 1)
						.map((inputField) =>
							inputField.type === 'TextField' ? (
								<TextFieldCV2X
									key={inputField.label}
									title={inputField.label}
									placeholder={inputField.placeholder}
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
										value={
											props.options
												.filter((item: any) => item.id === inputField.id)[0]
												.option.find(
													(option: any) =>
														option.value === getSearch(inputField.id)
												) || null
										}
										onChange={(_, value) => {
											handleSearchChange(
												inputField.id,
												value ? value.value : ''
											);
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

					{index + 1 === maxRow && (
						<Fragment>
							{Array.from(
								{ length: (props.template.length + 1) % 4 },
								(_, index) => (
									<div className="w-full" key={index} />
								)
							)}
							<Stack direction="row" className="w-full gap-8">
								<div className="grow" />
								<ButtonCV2X
									icon={BUTTON_LABEL.CLEAR}
									label={BUTTON_LABEL.CLEAR}
									variant="outlined"
									onClick={handleClearSearch}
								/>
								<ButtonCV2X
									icon={BUTTON_LABEL.SEARCH}
									label={BUTTON_LABEL.SEARCH}
									variant="contained"
									onClick={() => props.handleSubmitSearch(search)}
								/>
							</Stack>
						</Fragment>
					)}
				</Stack>
			))}
		</Stack>
	);
}
