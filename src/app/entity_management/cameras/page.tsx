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
import { DefaultDataGenerator, OptionGenerator } from '@/utils/DataGenerator';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createCameraAPI,
	deleteCameraAPI,
	getCamerasAPI,
	getCarsListAPI,
	updateCameraAPI,
} from '@/services/api-call';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(CameraFilterTemplate);
	const defaultData = DefaultDataGenerator(CameraActionModalTemplate);

	const [search, setSearch] = useState<IGetCamerasRequest>(defaultFilterData);

	const {
		isLoading: camerasLoading,
		data: cameras,
		refetch: refetchGetCameras,
	} = useQuery({
		queryKey: ['getCameras'],
		queryFn: async () => await getCamerasAPI(search),
	});

	const {
		isLoading: carsListLoading,
		data: carsList,
		refetch: refetchGetCarsList,
	} = useQuery({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI(),
	});

	const createCamera = useMutation({
		mutationFn: createCameraAPI,
		onSuccess: () => {
			refetchGetCameras();
			handleCloseModal(defaultData, setOpenRegisterModal, setRegisterModalData);
			enqueueSnackbar('Register a Camera successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to update a Camera', { variant: 'error' }),
	});

	const updateCamera = useMutation({
		mutationFn: updateCameraAPI,
		onSuccess: () => {
			refetchGetCameras();
			handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData);
			enqueueSnackbar('Update a Camera successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to update a Camera', { variant: 'error' }),
	});

	const deleteCamera = useMutation({
		mutationFn: deleteCameraAPI,
		onSuccess: () => {
			refetchGetCameras();
			handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData);
			enqueueSnackbar('Delete a Camera successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to delete a Camera', { variant: 'error' }),
	});

	const handleCloseModal = (
		defalutData: ICamera,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<ICamera>>
	) => {
		setModalData(defalutData);
		setOpenModal(false);
	};

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

	// Open-Close modal state
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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

	// Update modal
	const handleOpenUpdateModal = (updateData: ICamera) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
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

	const refetchData = () => {
		refetchGetCameras();
		refetchGetCarsList();
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
		return [
			{ id: 'position', option: positionOption },
			{
				id: 'car_id',
				option: OptionGenerator(carsList),
			},
		];
	};

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAMERA}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={() => createCamera.mutate(registerModalData)}
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
				onSubmit={() =>
					updateCamera.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
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
				onSubmit={() => deleteCamera.mutate(deleteModalData)}
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
							handleSubmitSearch={refetchGetCameras}
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
