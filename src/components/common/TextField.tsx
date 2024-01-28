// react
import { ChangeEvent, useState } from 'react';
// material ui
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import MuiTextField from '@mui/material/TextField';
// components
import Pill from './Pill';
import Text from './Text';
// consts
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface TextFieldProp {
	title?: string;
	isLocate?: boolean;
	handleLocate?: () => void;
	pill?: STATUS;
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

export default function TextField(props: TextFieldProp) {
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
						<Text style="text-black text-h5" content={props.title} />
						{props.isRequired && (
							<Text style="text-error_red text-h5" content="*" />
						)}
						{props.isLocate && props.title === 'Car' && (
							<IconButton
								disableRipple
								className="p-none text-primary_blue disabled:text-light_text_grey"
								disabled={props.isLoading || !props.handleLocate}
								onClick={props.handleLocate}
							>
								<IconMapper icon={BUTTON_LABEL.LOCATION} />
							</IconButton>
						)}
					</div>
					{!props.isLoading &&
						props.pill &&
						(props.title === 'Car' || props.title === 'Camera') && (
							<Pill variant={props.pill} />
						)}
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
				<MuiTextField
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
									<IconMapper
										icon={
											showPassword
												? BUTTON_LABEL.INVISIBLE
												: BUTTON_LABEL.VISIBLE
										}
									/>
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
			{!props.isLoading && props.isError && props.helperMessage && (
				<Text style="text-error_red text-p2" content={props.helperMessage} />
			)}
		</div>
	);
}
