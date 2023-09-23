'use client';

import { ChangeEvent } from 'react';

import { Stack, TextField } from '@mui/material';

interface TextFieldCV2XProp {
	title?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export default function TextFieldCV2X(props: TextFieldCV2XProp) {
	return (
		<Stack className="w-full gap-4">
			{props.title && (
				<p className="inline-block align-baseline font-istok text-black text-h5">
					{props.title}
				</p>
			)}
			<TextField
				fullWidth
				placeholder={props.placeholder}
				variant="outlined"
				className="rounded-lg h-44 bg-light_background_grey"
				sx={{
					'& .MuiOutlinedInput-root': {
						height: '44px',
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
					'& .MuiInputBase-input': {
						height: '20px',
						paddingX: '16px',
						paddingY: '12px',
					},
				}}
				value={props.value}
				onChange={props.onChange}
			/>
		</Stack>
	);
}
