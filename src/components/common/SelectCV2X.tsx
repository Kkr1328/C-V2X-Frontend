'use client';

import { SyntheticEvent } from 'react';

import {
	Stack,
	Autocomplete,
	TextField,
	IconButton,
	Skeleton,
} from '@mui/material';

import Pill from './Pill';
import IconMapper from '@/utils/IconMapper';

import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectCV2XProp {
	title?: string;
	handleLocate?: () => void;
	pill?: keyof typeof PILL_LABEL;
	placeholder?: string;
	options: SelectOption[];
	value: SelectOption | null;
	onChange: (
		event: SyntheticEvent<Element, Event>,
		value: SelectOption | null
	) => void;
	isLoading?: boolean;
	isRequired?: boolean;
	isError?: boolean;
	errorMessage?: string;
}

export default function SelectCV2X(props: SelectCV2XProp) {
	return (
		<Stack className="w-full gap-4">
			{/* Title */}
			{props.title && (
				<Stack direction="row" className="gap-16 items-center">
					<Stack direction="row" className="gap-4">
						<p className="inline-block align-baseline font-istok text-black text-h5">
							{props.title}
						</p>
						{props.isRequired && (
							<p className="inline-block align-baseline font-istok text-error_red text-h5">
								*
							</p>
						)}
						{props.handleLocate && (
							<IconButton
								disableRipple
								className="p-none text-primary_blue"
								disabled={props.isLoading}
								onClick={props.handleLocate}
							>
								<IconMapper icon={BUTTON_LABEL.LOCATION} />
							</IconButton>
						)}
					</Stack>
					{!props.isLoading && props.pill && <Pill variant={props.pill} />}
				</Stack>
			)}
			{/* Input field */}
			{props.isLoading ? (
				<Skeleton
					animation="wave"
					variant="rectangular"
					className="rounded-lg h-44"
				/>
			) : (
				<Autocomplete
					fullWidth
					blurOnSelect
					value={props.value}
					onChange={props.onChange}
					options={props.options}
					getOptionLabel={(option) => option.label}
					className="h-44"
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder={props.placeholder}
							className="rounded-lg h-44 bg-light_background_grey"
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: props.isError ? '#CC0000' : '#F2F2F2', //light_background_grey
										borderRadius: '15px',
										borderWidth: '2px',
									},
									'&:hover fieldset': {
										borderColor: props.isError ? '#CC0000' : '#F2F2F2', //light_background_grey
									},
									'&.Mui-focused fieldset': {
										borderColor: props.isError ? '#CC0000' : '#17A5D3', //primary_blue
									},
								},
							}}
						/>
					)}
					sx={{
						'& .MuiInputBase-root': {
							height: '44px',
							paddingY: '4.5px',
							paddingX: '11px',
						},
					}}
				/>
			)}
			{/* Helper text */}
			{!props.isLoading && props.isError && (
				<p className="inline-block align-baseline font-istok text-error_red text-p2">
					{props.errorMessage}
				</p>
			)}
		</Stack>
	);
}
