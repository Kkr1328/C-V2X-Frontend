// react
import { Dispatch, SetStateAction } from 'react';
// material ui
import { Card, Divider, Modal } from '@mui/material';
// components
import ModalHeader, { ModalHeaderProp } from './ModalHeader';
import ModalInputs, { ModalInputsProp } from './ModalInputs';
// utilities
import { DefaultDataGenerator } from '@/utils/DataGenerator';
import { handleCloseModal } from '@/utils/ModalController';

interface InputModalProp<T> extends ModalHeaderProp, ModalInputsProp<T> {
	open: boolean;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function InfoModal<T>(props: InputModalProp<T>) {
	const defaultData = DefaultDataGenerator(props.template);
	const handleOnClose = () =>
		handleCloseModal(defaultData, props.onOpenChange, props.onDataChange);

	return (
		<Modal
			open={props.open}
			onClose={handleOnClose}
			className="flex items-center justify-center"
		>
			<Card className="w-4/5 max-w-[600px] min-w-[400px] max-h-[90%] flex flex-col rounded-lg">
				<ModalHeader {...props} handleOnClose={handleOnClose} />
				<Divider />
				<div className="p-16 flex gap-16 flex-col overflow-y-auto">
					<ModalInputs {...props} isReadOnly />
				</div>
			</Card>
		</Modal>
	);
}
