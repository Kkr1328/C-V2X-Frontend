import { BUTTON_LABEL } from '@/constants/LABEL';
import IconMapper from '@/utils/IconMapper';

interface StatusDotProps {
	variant: 'Active' | 'Inactive' | 'Warning' | 'Emergency' | 'Missing';
}

export default function StatusDot(props: StatusDotProps) {
	if (props.variant === 'Active') {
		return (
			<div className="text-active_green">
				<IconMapper icon={BUTTON_LABEL.STATUS} size="16px" />
			</div>
		);
	} else if (props.variant === 'Inactive') {
		return (
			<div className="text-light_text_grey">
				<IconMapper icon={BUTTON_LABEL.STATUS} size="16px" />
			</div>
		);
	} else if (props.variant === 'Warning') {
		return (
			<div className="text-dark_warning_yellow">
				<IconMapper icon={BUTTON_LABEL.STATUS} size="16px" />
			</div>
		);
	} else if (props.variant === 'Emergency') {
		return (
			<div className="text-error_red">
				<IconMapper icon={BUTTON_LABEL.STATUS} size="16px" />
			</div>
		);
	} else if (props.variant === 'Missing') {
		return (
			<div className="text-black">
				<IconMapper icon={BUTTON_LABEL.MISSING} size="16px" />
			</div>
		);
	}
}
