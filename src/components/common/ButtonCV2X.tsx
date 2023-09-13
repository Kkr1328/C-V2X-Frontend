import IconMapper from '@/utils/IconMapper';
import Button from '@mui/material/Button';

interface ButtonCV2XProp {
	icon?: string;
	label?: string;
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'primary' | 'secondary' | 'accept' | 'error';
	disabled?: boolean;
}

export default function ButtonCV2X(props: ButtonCV2XProp) {
	const containedPrimaryStyle: string =
		'h-40 text-white bg-primary_blue hover:bg-dark_primary_blue disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedSecondaryStyle: string =
		'h-40 text-white bg-light_text_grey hover:bg-dark_text_grey disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedAcceptStyle: string =
		'h-40 text-white bg-active_green hover:bg-dark_active_green disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedErrorStyle: string =
		'h-40 text-white bg-error_red hover:bg-dark_error_red disabled:text-light_text_grey disabled:bg-dark_background_grey';

	const textPrimaryStyle: string =
		'h-40 text-primary_blue hover:bg-dark_background_blue disabled:text-light_text_grey';
	const textSecondaryStyle: string =
		'h-40 text-light_text_grey hover:bg-dark_background_grey disabled:text-light_text_grey';
	const textAcceptStyle: string =
		'h-40 text-active_green hover:bg-dark_background_green disabled:text-light_text_grey';
	const textErrorStyle: string =
		'h-40 text-error_red hover:bg-dark_background_red disabled:text-light_text_grey';

	const outlinedPrimaryStyle: string =
		'h-40 text-primary_blue border-primary_blue border-2 bg-white hover:border-primary_blue hover:border-2 hover:bg-dark_background_blue disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedSecondaryStyle: string =
		'h-40 text-light_text_grey border-light_text_grey border-2 bg-white hover:border-light_text_grey hover:border-2 hover:bg-dark_background_grey disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedAcceptStyle: string =
		'h-40 text-active_green border-active_green border-2 bg-white hover:border-active_green hover:border-2 hover:bg-dark_background_green disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedErrorStyle: string =
		'h-40 text-error_red border-error_red border-2 bg-white hover:border-error_red hover:border-2 hover:bg-dark_background_red disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';

	const buttonStyle: string = `p-8 gap-8 m-none rounded-md ${
		props.variant === 'text'
			? props.color === 'secondary'
				? textSecondaryStyle
				: props.color === 'accept'
				? textAcceptStyle
				: props.color === 'error'
				? textErrorStyle
				: textPrimaryStyle
			: props.variant === 'outlined'
			? props.color === 'secondary'
				? outlinedSecondaryStyle
				: props.color === 'accept'
				? outlinedAcceptStyle
				: props.color === 'error'
				? outlinedErrorStyle
				: outlinedPrimaryStyle
			: props.color === 'secondary'
			? containedSecondaryStyle
			: props.color === 'accept'
			? containedAcceptStyle
			: props.color === 'error'
			? containedErrorStyle
			: containedPrimaryStyle
	}`;

	return (
		<Button
			variant={props.variant}
			disabled={props.disabled}
			className={buttonStyle}>
			{props.icon && <IconMapper icon={props.icon} />}
			<p className="text-h5">{props.label}</p>
		</Button>
	);
}
