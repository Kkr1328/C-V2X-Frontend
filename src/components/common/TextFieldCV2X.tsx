// react
import { ChangeEvent, useState } from 'react';
// material ui
import { IconButton, InputAdornment, Skeleton, TextField } from '@mui/material';
// components
import Pill from './Pill';
//consts
import { BUTTON_LABEL, PILL_LABEL } from '@/constants/LABEL';
// utilities
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
	helperMessage?: string;
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
		<div className="flex flex-col w-full gap-4">
			{/* Title */}
			{props.title && (
				<div className="flex flex-row gap-16 items-center">
					<div className="flex flex-row gap-4">
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
					</div>
					{!props.isLoading && props.pill && <Pill variant={props.pill} />}
				</div>
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
						endAdornment: props.isPassword && (
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
					type={props.isPassword && !showPassword ? 'password' : 'text'}
					value={props.value}
					onChange={props.onChange}
				/>
			)}
			{/* Helper text */}
			{!props.isLoading && props.isError && (
				<p className="inline-block align-baseline font-istok text-error_red text-p2">
					{props.helperMessage}
				</p>
			)}
		</div>
	);
}
