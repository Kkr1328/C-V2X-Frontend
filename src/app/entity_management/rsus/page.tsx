'use client';
// react
import { useEffect, useState } from 'react';
// notisnack
import { useSnackbar } from 'notistack';
// material ui
import { Card, Divider, Stack } from '@mui/material';
// components
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import TableCV2X from '@/components/module/TableCV2X';
import ModalCV2X from '@/components/common/ModalCV2X';
import ModalInputs from '@/components/module/ModalInputs';
// consts
import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { IGetRSUsRequest, IRSU } from '@/types/models/rsu.model';
// templates
import { RSUFilterTemplate } from '@/templates/FILTER';
import { RSUsTableTemplate } from '@/templates/ENTITY_TABLE';
import { RSUInfoModalTemplate } from '@/templates/INFO_MODAL';
import { RSUActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetRSUs } from '@/redux/get-rsus/get-rsus-selector';
import { FETCH_GET_RSUS } from '@/redux/get-rsus/get-rsus-action';
import { FETCH_CREATE_RSU } from '@/redux/create-rsu/create-rsu-action';
import { FETCH_UPDATE_RSU } from '@/redux/update-rsu/update-rsu-action';
import { FETCH_DELETE_RSU } from '@/redux/delete-rsu/delete-rsu-action';
import { selectCreateRSU } from '@/redux/create-rsu/create-rsu-selector';
import { selectUpdateRSU } from '@/redux/update-rsu/update-rsu-selector';
import { selectDeleteRSU } from '@/redux/delete-rsu/delete-rsu-selector';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: rsus } = useSelector(selectGetRSUs);
	const { error: createRSUError } = useSelector(selectCreateRSU);
	const { error: updateRSUError } = useSelector(selectUpdateRSU);
	const { error: deleteRSUError } = useSelector(selectDeleteRSU);

	// Open-Close modal state
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = RSUActionModalTemplate.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as IRSU[keyof IRSU] }),
		{} as IRSU
	);

	// Modal data state
	const [informModalData, setInformModalData] = useState<IRSU>(defaultData);
	const [registerModalData, setRegisterModalData] = useState<IRSU>(defaultData);
	const [updateModalData, setUpdateModalData] = useState<IRSU>(defaultData);
	const [deleteModalData, setDeleteModalData] = useState<IRSU>(defaultData);

	// Inform modal
	const handleOpenInformModal = (informData: IRSU) => {
		setInformModalData(informData);
		setOpenInformModal(true);
	};
	const handleCloseInformModal = () => setOpenInformModal(false);

	// Register modal
	const handleOpenRegisterModel = () => setOpenRegisterModal(true);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultData);
	};
	const handleRegisterNotification = () => {
		if (!createRSUError) {
			enqueueSnackbar('Register a RSU sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to register a RSU', { variant: 'error' });
		}
	};
	const handleSubmitRegisterModal = () => {
		dispatch(FETCH_CREATE_RSU(registerModalData))
			.then(refetchData)
			.then(handleRegisterNotification);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: IRSU) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleUpdateNotification = () => {
		if (!updateRSUError) {
			enqueueSnackbar('Update a RSU sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to update a RSU', { variant: 'error' });
		}
	};
	const handleSubmitUpdateModal = () => {
		dispatch(
			FETCH_UPDATE_RSU({
				query: updateModalData,
				request: updateModalData,
			})
		)
			.then(refetchData)
			.then(handleUpdateNotification);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: IRSU) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteRSUError) {
			enqueueSnackbar('Delete a RSU sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a RSU', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_RSU(deleteModalData))
			.then(refetchData)
			.then(handleDeleteNotification);
		handleCloseDeleteModal();
	};

	const refetchData = () => dispatch(FETCH_GET_RSUS({}));
	const handleOnSearch = (search: IGetRSUsRequest) =>
		dispatch(FETCH_GET_RSUS(search));

	useEffect(() => {
		refetchData();
	}, []);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_RSU}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
			>
				<ModalInputs
					template={RSUActionModalTemplate}
					data={registerModalData}
					onDataChange={setRegisterModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={informModalData.name}
				variant={'Inform'}
				open={openInformModal}
				handleOnClose={handleCloseInformModal}
			>
				<ModalInputs
					template={RSUInfoModalTemplate}
					data={informModalData}
					onDataChange={setInformModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_RSU + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
			>
				<ModalInputs
					template={RSUActionModalTemplate}
					data={updateModalData}
					onDataChange={setUpdateModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.ARE_YOU_SURE}
				variant={BUTTON_LABEL.DELETE}
				open={openDeleteModal}
				handleOnClose={handleCloseDeleteModal}
				onSubmit={handleSubmitDeleteModal}
			>
				<p>
					{MODAL_LABEL.DO_YOU_REALLY_DELETE +
						deleteModalData.id +
						' RSU' +
						MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE}
				</p>
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.RSUS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={RSUFilterTemplate}
							handleSubmitSearch={handleOnSearch}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_RSU}
								variant="contained"
								onClick={handleOpenRegisterModel}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
								onClick={refetchData}
							/>
						</Stack>
						<TableCV2X<IRSU>
							columns={RSUsTableTemplate}
							rows={rsus ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={handleOpenUpdateModal}
							handleOnClickDelete={handleOpenDeleteModal}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
