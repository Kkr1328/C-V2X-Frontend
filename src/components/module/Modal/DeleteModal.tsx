// react
import React from 'react';
// material ui
import { Card, Divider, Modal } from '@mui/material';
// components
import Text from '@/components/common/Text';
import ModalActionButtons from './ModalActionButtons';
import ModalHeader from './ModalHeader';
// const
import { BUTTON_LABEL, MODAL_LABEL } from '@/constants/LABEL';

interface DeleteModalProp {
	open: boolean;
	handleOnClose: () => void;
	entity: string;
	onSubmit: () => void;
}

export default function DeleteModal(props: DeleteModalProp) {
	return (
		<Modal
			open={props.open}
			onClose={props.handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="w-4/5 max-w-[600px] min-w-[400px] max-h-[90%] flex flex-col rounded-lg">
				<ModalHeader title={MODAL_LABEL.ARE_YOU_SURE} />
				<Divider />
				<div className="p-16 flex gap-16">
					<Text
						content={
							MODAL_LABEL.DO_YOU_REALLY_DELETE +
							props.entity +
							MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE
						}
					/>
				</div>
				<Divider />
				<ModalActionButtons variant={BUTTON_LABEL.DELETE} {...props} />
			</Card>
		</Modal>
	);
}
