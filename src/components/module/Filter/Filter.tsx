'use client';
// react
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
// material ui
import Grid from '@mui/material/Grid';
// components
import TextField from '@/components/common/TextField';
import Select from '@/components/common/Select';
import FilterActionButtons, {
	FilterActionButtonsProp,
} from './FilterActionButtons';
// types
import { InputFieldProp, OptionTemplate, Option } from '@/types/COMMON';
import { WidthObserver } from '@/utils/WidthObserver';

interface FilterProp<T> extends FilterActionButtonsProp {
	template: InputFieldProp<T>[];
	search: T;
	setSearch: Dispatch<SetStateAction<T>>;
	options?: OptionTemplate[];
}

export default function Filter<T>(props: FilterProp<T>) {
	const filterRef = useRef<HTMLDivElement>(null);
	const [filterWidth, setFilterWidth] = useState<number>(1000);
	useEffect(() => WidthObserver(filterRef.current, setFilterWidth), []);

	const fieldSize = 240;
	const fieldGridSize = 40;
	const columnNum = Math.max(Math.floor(filterWidth / fieldSize), 1);
	const lastItemGridSize =
		fieldGridSize *
		Math.max(0, columnNum - (props.template.length % columnNum));

	const getSearch = (id: keyof T) => `${props.search[id]}`;

	const handleSearchChange = (id: keyof T, value: string) => {
		props.setSearch({
			...props.search,
			[id]: value,
		} as T);
	};

	const getOption = (inputField: InputFieldProp<T>): Option[] =>
		props.options?.find((item: OptionTemplate) => item.id === inputField.id)
			?.option || [];

	return (
		<Grid
			ref={filterRef}
			container
			columns={{ xs: fieldGridSize * columnNum + 1 }}
			rowSpacing={2}
			columnSpacing={1}
			className="min-w-[240px] -ml-4 -mr-16 justify-center items-end"
		>
			{props.template.map((inputField, index) => (
				<Grid
					item
					key={index}
					xs={fieldGridSize}
					className={index % columnNum === 0 ? 'pl-none' : ''}
				>
					{inputField.type === 'TextField' ? (
						<TextField
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
							<Select
								key={inputField.label}
								title={inputField.label}
								placeholder={inputField.placeholder}
								value={
									getOption(inputField).find((option: Option) => {
										return option.value === getSearch(inputField.id);
									}) || null
								}
								onChange={(_, value) => {
									handleSearchChange(inputField.id, value ? value.value : '');
								}}
								options={getOption(inputField)}
							/>
						)
					)}
				</Grid>
			))}
			<Grid item key={0} xs={lastItemGridSize} className="items-end">
				<FilterActionButtons {...props} isCompact={columnNum === 1} />
			</Grid>
		</Grid>
	);
}
