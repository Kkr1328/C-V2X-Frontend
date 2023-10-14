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
import { CamerasProps } from '@/types/ENTITY';
// templates
import { CameraFilterTemplate } from '@/templates/FILTER';
import { CamerasTableTemplate } from '@/templates/ENTITY_TABLE';
import { CameraInfoModalTemplate } from '@/templates/INFO_MODAL';
import { CameraActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetCameras } from '@/redux/get-cameras/get-cameras-selector';
import { selectCreateCamera } from '@/redux/create-camera/create-camera-selector';
import { selectUpdateCamera } from '@/redux/update-camera/update-camera-selector';
import { selectDeleteCamera } from '@/redux/delete-camera/delete-camera-selector';
import { FETCH_GET_CAMERAS } from '@/redux/get-cameras/get-cameras-action';
import { FETCH_CREATE_CAMERA } from '@/redux/create-camera/create-camera-action';
import { FETCH_UPDATE_CAMERA } from '@/redux/update-camera/update-camera-action';
import { FETCH_DELETE_CAMERA } from '@/redux/delete-camera/delete-camera-action';
import { IGetCamerasRequest } from '@/types/models/camera.model';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: cameras } = useSelector(selectGetCameras);
	const { error: createCameraError } = useSelector(selectCreateCamera);
	const { error: updateCameraError } = useSelector(selectUpdateCamera);
	const { error: deleteCameraError } = useSelector(selectDeleteCamera);

	// Open-Close modal state
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = CameraActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as CamerasProps[keyof CamerasProps],
		}),
		{} as CamerasProps
	);

	// Modal data state
	const [informModalData, setInformModalData] =
		useState<CamerasProps>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<CamerasProps>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<CamerasProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<CamerasProps>(defaultData);

	// Inform modal
	const handleOpenInformModal = (informData: CamerasProps) => {
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
		if (!createCameraError) {
			enqueueSnackbar('Register a camera sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to register a camera', { variant: 'error' });
		}
	};
	const handleSubmitRegisterModal = () => {
		dispatch(
			FETCH_CREATE_CAMERA({
				name: registerModalData.name,
				position: registerModalData.position,
				car_id: registerModalData.car_id,
			})
		)
			.then(refetchData)
			.then(handleRegisterNotification);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: CamerasProps) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleUpdateNotification = () => {
		if (!updateCameraError) {
			enqueueSnackbar('Update a camera sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to update a camera', { variant: 'error' });
		}
	};
	const handleSubmitUpdateModal = () => {
		dispatch(
			FETCH_UPDATE_CAMERA({
				query: { id: updateModalData.id },
				request: {
					name: updateModalData.name,
					position: updateModalData.position,
					car_id: updateModalData.car_id,
				},
			})
		)
			.then(refetchData)
			.then(handleUpdateNotification);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: CamerasProps) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteCameraError) {
			enqueueSnackbar('Delete a camera sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a camera', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_CAMERA({ id: deleteModalData.id }))
			.then(refetchData)
			.then(handleDeleteNotification);
		handleCloseDeleteModal();
	};

	const refetchData = () => dispatch(FETCH_GET_CAMERAS({}));
	const handleOnSearch = (search: IGetCamerasRequest) =>
		dispatch(FETCH_GET_CAMERAS(search));

	useEffect(() => {
		refetchData();
	}, []);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAMERA}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
			>
				<ModalInputs
					template={CameraActionModalTemplate}
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
					template={CameraInfoModalTemplate}
					data={informModalData}
					onDataChange={setInformModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_CAMERA + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
			>
				<ModalInputs
					template={CameraActionModalTemplate}
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
						' camera' +
						MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE}
				</p>
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERAS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={CameraFilterTemplate}
							handleSubmitSearch={handleOnSearch}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_CAMERA}
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
						<TableCV2X<CamerasProps>
							columns={CamerasTableTemplate}
							rows={(cameras as CamerasProps[]) ?? []}
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
