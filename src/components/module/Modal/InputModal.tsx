'use client';
// react
import { Dispatch, SetStateAction, useState } from 'react';
// material ui
import { Card, Divider, Modal } from '@mui/material';
// components
import ModalHeader from './ModalHeader';
import ModalInputs, { ModalInputsProp } from './ModalInputs';
import ModalActionButtons, {
	ModalActionButtonsProp,
} from './ModalActionButtons';
import Loading from '@/components/common/Loading';
// types
import { InputError } from '@/types/COMMON';
// utilities
import {
	DefaultDataGenerator,
	DefaultErrorGenerator,
} from '@/utils/DataGenerator';
import { handleCloseModal } from '@/utils/ModalController';
import { InputValidator } from '@/utils/InputValidator';

interface InputModalProp<T> extends ModalInputsProp<T>, ModalActionButtonsProp {
	open: boolean;
	onOpenChange: Dispatch<SetStateAction<boolean>>;
	isPending?: boolean;
	onSubmit: () => void;
	title: string;
}

export default function InputModal<T>(props: InputModalProp<T>) {
	const defaultData = DefaultDataGenerator(props.template);
	const defaultError = DefaultErrorGenerator(props.template);

	const [error, setError] = useState<InputError<T>>(defaultError);

	const handleOnClose = () => {
		setError(defaultError);
		handleCloseModal(defaultData, props.onOpenChange, props.onDataChange);
	};

	const resetError = (id: keyof T) => {
		setError({ ...error, [id]: '' });
	};

	const validateError = async () => {
		let isError = false;
		const newError = defaultError;
		Object.keys(error).forEach((id) => {
			const fieldTemplate = props.template.find((field) => field.id === id);
			if (fieldTemplate) {
				const errorMessage = InputValidator(
					fieldTemplate,
					props.data[id as keyof T] as string,
					props.data['password' as keyof T] as string
				);
				newError[id as keyof T] = errorMessage;
				if (errorMessage !== '') isError = true;
			}
		});
		setError(newError);
		return isError;
	};

	return (
		<Modal
			open={props.open}
			onClose={handleOnClose}
			className="flex items-center justify-center"
		>
			{props.isPending ? (
				<Loading size={48} />
			) : (
				<Card className="w-4/5 max-w-[600px] min-w-[400px] max-h-[90%] flex flex-col rounded-lg">
					<ModalHeader title={props.title} />
					<Divider />
					<div className="p-16 overflow-y-auto">
						<ModalInputs {...props} error={error} resetError={resetError} />
					</div>
					<Divider />
					<ModalActionButtons
						{...props}
						handleOnClose={handleOnClose}
						onSubmit={() => {
							validateError().then((isError) => {
								if (!isError) props.onSubmit();
							});
						}}
					/>
				</Card>
			)}
		</Modal>
	);
}
