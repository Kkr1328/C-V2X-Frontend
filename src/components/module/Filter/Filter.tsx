'use client';
// react
import { Dispatch, Fragment, SetStateAction } from 'react';
// material ui
import { Stack } from '@mui/material';
// components
import TextFieldCV2X from '@/components/common/TextFieldCV2X';
import SelectCV2X from '@/components/common/SelectCV2X';
import FilterActionButtons, {
	FilterActionButtonsProp,
} from './FilterActionButtons';
// types
import { InputFieldProp, OptionTemplate, Option } from '@/types/COMMON';

interface FilterProp<T> extends FilterActionButtonsProp {
	template: InputFieldProp<T>[];
	fieldPerRow: number;
	search: T;
	setSearch: Dispatch<SetStateAction<T>>;
	options?: OptionTemplate[];
}

export default function Filter<T>(props: FilterProp<T>) {
	const maxRow =
		Math.max(...props.template.map((item) => item.row), 0) +
		Number(props.template.length % props.fieldPerRow === 0);

	const getSearch = (id: keyof T) => {
		return props.search ? (props.search[id] as string) : '';
	};

	const handleSearchChange = (id: keyof T, value: string) => {
		props.setSearch({
			...props.search,
			[id]: value,
		} as T);
	};

	const getOption = (inputField: InputFieldProp<T>): Option[] => {
		return (
			props.options?.filter(
				(item: OptionTemplate) => item.id === inputField.id
			)[0].option ?? []
		);
	};

	return (
		<Stack className="w-full min-w-[240px] gap-8">
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
											getOption(inputField).find(
												(option: Option) =>
													option.value === getSearch(inputField.id)
											) || null
										}
										onChange={(_, value) => {
											handleSearchChange(
												inputField.id,
												value ? value.value : ''
											);
										}}
										options={getOption(inputField)}
									/>
								)
							)
						)}

					{index + 1 === maxRow && (
						<Fragment>
							{Array.from(
								{ length: (props.template.length + 1) % props.fieldPerRow },
								(_, index) => (
									<div className="w-full" key={index} />
								)
							)}
							<FilterActionButtons {...props} />
						</Fragment>
					)}
				</Stack>
			))}
		</Stack>
	);
}
