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
} from '@/types/COMMON';
// utilities
import { useCameraStatus, useCarStatus } from '@/utils/FleetRetriever';

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

	const useGetCameraStatus = (
		camIdField: keyof typeof props.data,
		carIdField: keyof typeof props.data
	) => {
		const camId =
			typeof props.data === 'object' && props.data && camIdField in props.data
				? (props.data[camIdField] as string)
				: '';
		const carId =
			typeof props.data === 'object' && props.data && carIdField in props.data
				? (props.data[carIdField] as string)
				: '';
		return useCameraStatus(camId, carId);
	};

	const frontCameraStatus = useGetCameraStatus(
		'front_cam_id' as keyof typeof props.data,
		'id' as keyof typeof props.data
	);
	const backCameraStatus = useGetCameraStatus(
		'back_cam_id' as keyof typeof props.data,
		'id' as keyof typeof props.data
	);
	const leftCameraStatus = useGetCameraStatus(
		'left_cam_id' as keyof typeof props.data,
		'id' as keyof typeof props.data
	);
	const rightCameraStatus = useGetCameraStatus(
		'right_cam_id' as keyof typeof props.data,
		'id' as keyof typeof props.data
	);
	const carId =
		typeof props.data === 'object' && props.data && 'car_id' in props.data
			? (props.data.car_id as string)
			: '';
	const carStatus = useCarStatus(carId);

	const getPill = (inputField: InputFieldProp<T>) => {
		switch (inputField.id) {
			case 'front_cam_name':
				return frontCameraStatus;
			case 'back_cam_name':
				return backCameraStatus;
			case 'left_cam_name':
				return leftCameraStatus;
			case 'right_cam_name':
				return rightCameraStatus;
			case 'car':
				return carStatus;
			default:
				return;
		}
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
