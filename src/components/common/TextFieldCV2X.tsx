'use client';

import { ChangeEvent, useState } from 'react';

import {
	IconButton,
	InputAdornment,
	Skeleton,
	Stack,
	TextField,
} from '@mui/material';
import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';
import Pill from './Pill';
import IconMapper from '@/utils/IconMapper';

interface TextFieldCV2XProp {
	title?: string;
	handleLocate?: () => void;
	pill?: keyof typeof PILL_LABEL;
	placeholder?: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	isReadOnly?: boolean;
	isLoading?: boolean;
	isPassword?: boolean;
	isRequired?: boolean;
	isError?: boolean;
	errorMessage?: string;
}

export default function TextFieldCV2X(props: TextFieldCV2XProp) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

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
								className={`p-none ${
									props.isLoading ? 'text-light_text_grey' : 'text-primary_blue'
								}`}
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
				<TextField
					fullWidth
					placeholder={props.placeholder}
					variant="outlined"
					className="rounded-lg h-44 bg-light_background_grey"
					sx={{
						'& .MuiOutlinedInput-root': {
							height: '44px',
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
						'& .MuiInputBase-input': {
							height: '20px',
							paddingX: '16px',
							paddingY: '12px',
						},
					}}
					InputProps={{
						readOnly: props.isReadOnly,
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
									className="text-light_text_grey"
								>
									{showPassword ? (
										<IconMapper icon={BUTTON_LABEL.INVISIBLE} />
									) : (
										<IconMapper icon={BUTTON_LABEL.VISIBLE} />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					type={showPassword ? 'text' : 'password'}
					value={props.value}
					onChange={props.onChange}
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
