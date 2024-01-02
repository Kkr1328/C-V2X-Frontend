// react
import { Dispatch, SetStateAction } from 'react';

export function handleOpenModal<T>(
	modalData: T,
	setOpenModal: Dispatch<SetStateAction<boolean>>,
	setModalData: Dispatch<SetStateAction<T>>
) {
	setOpenModal(true);
	setModalData(modalData);
}

export function handleCloseModal<T>(
	defalutData: T,
	setOpenModal: Dispatch<SetStateAction<boolean>>,
	setModalData: Dispatch<SetStateAction<T>>
) {
	setModalData(defalutData);
	setOpenModal(false);
}
