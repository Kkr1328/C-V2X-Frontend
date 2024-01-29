// components
import Button from '@/components/common/Button';
// const
import { BUTTON_LABEL } from '@/constants/LABEL';

export interface ModalActionButtonsProp {
	handleOnClose?: () => void;
	onSubmit: () => void;
	variant: BUTTON_LABEL.REGISTER | BUTTON_LABEL.UPDATE | BUTTON_LABEL.DELETE;
	isLoading?: boolean;
}

export default function ModalActionButtons(props: ModalActionButtonsProp) {
	return (
		<div className="p-16 flex gap-16">
			<div className="grow" />
			<Button
				variant="text"
				color="secondary"
				label={BUTTON_LABEL.CANCEL}
				onClick={props.handleOnClose}
			/>
			<Button
				variant="contained"
				color={props.variant === BUTTON_LABEL.DELETE ? 'error' : 'accept'}
				isDisabled={props.isLoading}
				label={props.variant}
				onClick={props.onSubmit}
			/>
		</div>
	);
}
