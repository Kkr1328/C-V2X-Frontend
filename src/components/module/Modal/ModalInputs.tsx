'use client';
// react
import { Dispatch, SetStateAction } from 'react';
// material ui
import { Grid } from '@mui/material';
// components
import Select from '@/components/common/Select';
import TextField from '@/components/common/TextField';
// types
import {
	InputFieldProp,
	OptionTemplate,
	Option,
	InputError,
	Position,
} from '@/types/COMMON';
// const
import { STATUS } from '@/constants/LABEL';

export interface ModalInputsProp<T> {
	template: InputFieldProp<T>[];
	data: T;
	onDataChange: Dispatch<SetStateAction<T>>;
	options?: OptionTemplate[];
	isReadOnly?: boolean;
	error?: InputError<T>;
	resetError?: (_: keyof T) => void;
	isLocate?: boolean;
	handleLocate?: () => void;
	isCompact?: boolean;
	setPill?: (position?: Position, id?: string) => STATUS;
}

export default function ModalInputs<T>(props: ModalInputsProp<T>) {
	const fieldGridSize = 40;
	const columnNum = props.isCompact ? 1 : 2;
	let aggregateSpan = 0;

	const getData = (id: keyof T) => {
		return props.data
			? (props.data[id] as string) ?? (id === 'driver' ? '-' : '')
			: '';
	};

	const getPill = (inputField: InputFieldProp<T>) => {
		if (typeof props.data === 'object' && props.data && 'id' in props.data) {
			if (inputField.id === 'front_cam_name')
				return props.setPill?.('Front', props.data.id as string);
			else if (inputField.id === 'back_cam_name')
				return props.setPill?.('Back', props.data.id as string);
			else if (inputField.id === 'left_cam_name')
				return props.setPill?.('Left', props.data.id as string);
			else if (inputField.id === 'right_cam_name')
				return props.setPill?.('Right', props.data.id as string);
		}
		return props.setPill?.();
	};

	const handleDataChange = (id: keyof T, value: string) => {
		props.onDataChange({
			...props.data,
			[id]: value,
		} as T);
	};

	const getOption = (inputField: InputFieldProp<T>): Option[] =>
		props.options?.find((item: OptionTemplate) => item.id === inputField.id)
			?.option || [];

	return (
		<Grid
			container
			columns={{ xs: fieldGridSize * columnNum + 1 }}
			rowSpacing={2}
			columnSpacing={1}
			className="min-w-[240px] -ml-2 -mr-8 justify-center items-end"
		>
			{props.template.map((inputField, index) => {
				if (props.isReadOnly && !getData(inputField.id)) return;
				aggregateSpan += inputField.isSpan ? 1 : 0;
				return (
					<Grid
						item
						key={index}
						xs={inputField.isSpan ? fieldGridSize * columnNum : fieldGridSize}
						className={
							(index + aggregateSpan) % columnNum === 0 || inputField.isSpan
								? 'pl-none'
								: ''
						}
					>
						{(props.isReadOnly || inputField.type === 'TextField') &&
						((inputField.id !== 'front_cam_name' &&
							inputField.id !== 'front_cam_position' &&
							inputField.id !== 'back_cam_name' &&
							inputField.id !== 'back_cam_position' &&
							inputField.id !== 'left_cam_name' &&
							inputField.id !== 'left_cam_position' &&
							inputField.id !== 'right_cam_name' &&
							inputField.id !== 'right_cam_position') ||
							getData(inputField.id) !== '') ? (
							<TextField
								{...props}
								{...inputField}
								key={inputField.label}
								title={inputField.label}
								value={getData(inputField.id)}
								onChange={(event) => {
									props.resetError?.(inputField.id);
									handleDataChange(inputField.id, event.target.value);
								}}
								pill={getPill(inputField)}
								isError={props.error && props.error?.[inputField.id] !== ''}
								helperMessage={props.error && props.error?.[inputField.id]}
							/>
						) : (
							inputField.type === 'Select' && (
								<Select
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
						)}
					</Grid>
				);
			})}
		</Grid>
	);
}
