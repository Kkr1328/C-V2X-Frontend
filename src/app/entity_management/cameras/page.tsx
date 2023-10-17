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
import { ICamera, IGetCamerasRequest } from '@/types/models/camera.model';
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
import { selectGetCarsList } from '@/redux/get-cars-list/get-cars-list-selector';
import { FETCH_GET_CAMERAS } from '@/redux/get-cameras/get-cameras-action';
import { FETCH_CREATE_CAMERA } from '@/redux/create-camera/create-camera-action';
import { FETCH_UPDATE_CAMERA } from '@/redux/update-camera/update-camera-action';
import { FETCH_DELETE_CAMERA } from '@/redux/delete-camera/delete-camera-action';
import { FETCH_GET_CARS_LIST } from '@/redux/get-cars-list/get-cars-list-action';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: cameras, loading: camerasLoading } =
		useSelector(selectGetCameras);
	const { data: carsList } = useSelector(selectGetCarsList);
	const { error: registerCameraError, loading: registerCameraLoading } =
		useSelector(selectCreateCamera);
	const { error: updateCameraError, loading: updateCameraLoading } =
		useSelector(selectUpdateCamera);
	const { error: deleteCameraError, loading: deleteCameraLoading } =
		useSelector(selectDeleteCamera);

	const defaultFilterData = CameraFilterTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as IGetCamerasRequest[keyof IGetCamerasRequest],
		}),
		{} as IGetCamerasRequest
	);

	// fiiter state
	const [search, setSearch] = useState<IGetCamerasRequest>(defaultFilterData);

	const getSearch = (id: keyof IGetCamerasRequest) => {
		if (search) {
			return search[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof IGetCamerasRequest, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as IGetCamerasRequest);
	};
	const handleClearSearch = () => {
		setSearch(defaultFilterData);
	};
	const handleOnSearch = () => dispatch(FETCH_GET_CAMERAS(search));

	// Open-Close modal state
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = CameraActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as ICamera[keyof ICamera],
		}),
		{} as ICamera
	);

	// Modal data state
	const [informModalData, setInformModalData] = useState<ICamera>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<ICamera>(defaultData);
	const [updateModalData, setUpdateModalData] = useState<ICamera>(defaultData);
	const [deleteModalData, setDeleteModalData] = useState<ICamera>(defaultData);

	// Inform modal
	const handleOpenInformModal = (informData: ICamera) => {
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
		if (!registerCameraError) {
			enqueueSnackbar('Register a camera successfully', {
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
		).then(refetchData);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: ICamera) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleUpdateNotification = () => {
		if (!updateCameraError) {
			enqueueSnackbar('Update a camera successfully', {
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
		).then(refetchData);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: ICamera) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteCameraError) {
			enqueueSnackbar('Delete a camera successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a camera', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_CAMERA({ id: deleteModalData.id })).then(refetchData);
		handleCloseDeleteModal();
	};

	const refetchData = () => {
		dispatch(FETCH_GET_CAMERAS({}));
		dispatch(FETCH_GET_CARS_LIST());
	};

	const handleOnClickRefresh = () => {
		handleClearSearch();
		refetchData();
	};

	const generateOptions = () => {
		const positionOption = [
			{
				value: 'Front',
				label: 'Front',
			},
			{
				value: 'Back',
				label: 'Back',
			},
		];
		const carOption =
			carsList?.map((car) => {
				return { value: car.id, label: car.name };
			}) || [];
		return [
			{ id: 'position', option: positionOption },
			{
				id: 'car_id',
				option: carOption,
			},
		];
	};

	useEffect(() => {
		refetchData();
	}, []);

	useEffect(() => {
		if (!registerCameraLoading && registerCameraLoading !== undefined) {
			handleRegisterNotification();
		}
	}, [registerCameraLoading]);

	useEffect(() => {
		if (!updateCameraLoading && updateCameraLoading !== undefined) {
			handleUpdateNotification();
		}
	}, [updateCameraLoading]);

	useEffect(() => {
		if (!deleteCameraLoading && deleteCameraLoading !== undefined) {
			handleDeleteNotification();
		}
	}, [deleteCameraLoading]);

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
					options={generateOptions()}
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
					options={generateOptions()}
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
							getSearch={getSearch}
							handleSearchChange={handleSearchChange}
							handleClearSearch={handleClearSearch}
							options={generateOptions()}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total (${
								cameras?.length || 0
							})`}</p>
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
								onClick={handleOnClickRefresh}
							/>
						</Stack>
						<TableCV2X<ICamera>
							columns={CamerasTableTemplate}
							rows={(cameras as ICamera[]) ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={handleOpenUpdateModal}
							handleOnClickDelete={handleOpenDeleteModal}
							isLoading={camerasLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
