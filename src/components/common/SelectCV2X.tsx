'use client';

import {
	Stack,
	SelectChangeEvent,
	Autocomplete,
	TextField,
	Box,
} from '@mui/material';
import { SyntheticEvent } from 'react';

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectCV2XProp {
	title?: string;
	options: SelectOption[];
	value: SelectOption | null;
	onChange: (
		event: SyntheticEvent<Element, Event>,
		value: SelectOption | null
	) => void;
	placeholder?: string;
}

export default function SelectCV2X(props: SelectCV2XProp) {
	return (
		<Stack className="gap-4">
			{props.title && <p className="text-black text-h4">{props.title}</p>}
			<Autocomplete
				fullWidth
				blurOnSelect
				value={props.value}
				onChange={props.onChange}
				options={props.options}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={props.placeholder}
						className="rounded-lg bg-light_background_grey"
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: '#F2F2F2', //light_background_grey
									borderRadius: '15px',
								},
								'&:hover fieldset': {
									borderColor: '#F2F2F2', //light_background_grey
								},
								'&.Mui-focused fieldset': {
									borderColor: '#17A5D3', //primary_blue
								},
							},
						}}
					/>
				)}
			/>
		</Stack>
	);
}
