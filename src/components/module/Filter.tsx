'use client';

import { Fragment } from 'react';

import { Stack } from '@mui/material';

import TextFieldCV2X from '../common/TextFieldCV2X';
import SelectCV2X from '../common/SelectCV2X';
import ButtonCV2X from '../common/ButtonCV2X';

import { BUTTON_LABEL } from '@/constants/LABEL';
import { InputFieldProp } from '@/types/common/input.model';

interface FilterProp<T> {
	template: InputFieldProp<T>[];
	handleSubmitSearch: () => void;
	getSearch: (id: keyof T) => string;
	handleSearchChange: (id: keyof T, value: string) => void;
	handleClearSearch: () => void;
	options?: any;
}

export default function Filter<T>(props: FilterProp<T>) {
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
									value={props.getSearch(inputField.id)}
									onChange={(event) =>
										props.handleSearchChange(inputField.id, event.target.value)
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
														option.value === props.getSearch(inputField.id)
												) || null
										}
										onChange={(_, value) => {
											props.handleSearchChange(
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
									onClick={props.handleClearSearch}
								/>
								<ButtonCV2X
									icon={BUTTON_LABEL.SEARCH}
									label={BUTTON_LABEL.SEARCH}
									variant="contained"
									onClick={props.handleSubmitSearch}
								/>
							</Stack>
						</Fragment>
					)}
				</Stack>
			))}
		</Stack>
	);
}
