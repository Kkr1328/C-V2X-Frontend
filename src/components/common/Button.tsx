// material ui
import MuiButton from '@mui/material/Button';
// utilities
import IconMapper from '@/utils/IconMapper';

interface ButtonProp {
	icon?: string;
	label?: string;
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'primary' | 'secondary' | 'accept' | 'error';
	isDisabled?: boolean;
	onClick?: () => void;
}

export default function Button(props: ButtonProp) {
	const containedPrimaryStyle: string =
		'text-white bg-primary_blue hover:bg-dark_primary_blue disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedSecondaryStyle: string =
		'text-white bg-light_text_grey hover:bg-dark_text_grey disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedAcceptStyle: string =
		'text-white bg-active_green hover:bg-dark_active_green disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const containedErrorStyle: string =
		'text-white bg-error_red hover:bg-dark_error_red disabled:text-light_text_grey disabled:bg-dark_background_grey';

	const textPrimaryStyle: string =
		'text-primary_blue hover:bg-dark_background_blue disabled:text-light_text_grey';
	const textSecondaryStyle: string =
		'text-light_text_grey hover:bg-dark_background_grey disabled:text-light_text_grey';
	const textAcceptStyle: string =
		'text-active_green hover:bg-dark_background_green disabled:text-light_text_grey';
	const textErrorStyle: string =
		'text-error_red hover:bg-dark_background_red disabled:text-light_text_grey';

	const outlinedPrimaryStyle: string =
		'text-primary_blue border-primary_blue border-2 bg-white hover:border-primary_blue hover:border-2 hover:bg-dark_background_blue disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedSecondaryStyle: string =
		'text-light_text_grey border-light_text_grey border-2 bg-white hover:border-light_text_grey hover:border-2 hover:bg-dark_background_grey disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedAcceptStyle: string =
		'text-active_green border-active_green border-2 bg-white hover:border-active_green hover:border-2 hover:bg-dark_background_green disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';
	const outlinedErrorStyle: string =
		'text-error_red border-error_red border-2 bg-white hover:border-error_red hover:border-2 hover:bg-dark_background_red disabled:border-light_text_grey disabled:border-2 disabled:text-light_text_grey disabled:bg-dark_background_grey';

	const buttonStyle: string = `${
		props.label ? '' : '!w-44'
	} normal-case min-w-0 h-44 px-12 m-none gap-8 rounded-md
	${
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
		<MuiButton
			variant={props.variant}
			className={buttonStyle}
			disabled={props.isDisabled}
			onClick={props.onClick}
		>
			{props.icon && <IconMapper icon={props.icon} />}
			{props.label && (
				<p className="inline-block align-baseline font-istok text-h5">
					{props.label}
				</p>
			)}
		</MuiButton>
	);
}
