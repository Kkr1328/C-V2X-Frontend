import { Stack, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface TextFieldCV2XProp {
	title?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export default function TextFieldCV2X(props: TextFieldCV2XProp) {
	return (
		<Stack className="gap-4">
			{props.title && <p className="text-black text-h4">{props.title}</p>}
			<TextField
				fullWidth
				placeholder={props.placeholder}
				variant="outlined"
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
				value={props.value}
				onChange={props.onChange}
			/>
		</Stack>
	);
}
