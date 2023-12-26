// components
import ButtonCV2X from '@/components/common/ButtonCV2X';
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
			<ButtonCV2X
				variant="text"
				color="secondary"
				label={BUTTON_LABEL.CANCEL}
				onClick={props.handleOnClose}
			/>
			<ButtonCV2X
				variant="contained"
				color={props.variant === BUTTON_LABEL.DELETE ? 'error' : 'accept'}
				isDisabled={props.isLoading}
				label={props.variant}
				onClick={props.onSubmit}
			/>
		</div>
	);
}
