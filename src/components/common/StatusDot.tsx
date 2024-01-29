// consts
import { BUTTON_LABEL, STATUS } from '@/constants/LABEL';
// utilities
import IconMapper from '@/utils/IconMapper';

interface StatusDotProps {
	variant: STATUS;
}

export default function StatusDot(props: StatusDotProps) {
	const statusDotColor =
		props.variant === STATUS.ACTIVE
			? 'text-active_green'
			: props.variant === STATUS.INACTIVE
			? 'text-light_text_grey'
			: props.variant === STATUS.WARNING
			? 'text-dark_warning_yellow'
			: props.variant === STATUS.EMERGENCY
			? 'text-error_red'
			: 'text-black';

	const statusDotIcon =
		props.variant === STATUS.MISSING
			? BUTTON_LABEL.MISSING
			: BUTTON_LABEL.STATUS;

	return (
		<div className={statusDotColor}>
			<IconMapper icon={statusDotIcon} size="16px" />
		</div>
	);
}
