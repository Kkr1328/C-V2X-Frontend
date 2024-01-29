// react
import { SyntheticEvent } from 'react';
// material ui
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
// components
import Pill from './Pill';
import Text from './Text';
// consts
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProp {
	title?: string;
	handleLocate?: () => void;
	pill?: STATUS;
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
	helperMessage?: string;
}

export default function Select(props: SelectProp) {
	return (
		<div className="flex flex-col gap-4 w-full">
			{/* Title */}
			{props.title && (
				<div className="flex flex-row gap-16 items-center">
					<div className="flex flex-row gap-4">
						<Text style="text-black text-h5" content={props.title} />
						{props.isRequired && (
							<Text style="text-error_red text-h5" content="*" />
						)}
						{props.handleLocate && (
							<IconButton
								disableRipple
								className="p-none text-primary_blue disabled:text-light_text_grey"
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
					renderOption={(props, option) => {
						return (
							<li {...props} key={option.value}>
								{option.label}
							</li>
						);
					}}
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
			{!props.isLoading && props.isError && props.helperMessage && (
				<Text style="text-error_red text-p2" content={props.helperMessage} />
			)}
		</div>
	);
}
