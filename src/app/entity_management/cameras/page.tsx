'use client';
// react
import { useEffect, useRef, useState } from 'react';
// notisnack
import { useSnackbar } from 'notistack';
// material ui
import { Card, Divider, Stack } from '@mui/material';
// components
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter/Filter';
import InputModal from '@/components/module/Modal/InputModal';
import InfoModal from '@/components/module/Modal/InfoModal';
import DeleteModal from '@/components/module/Modal/DeleteModal';
// consts
import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { ICamera, IGetCamerasRequest } from '@/types/models/camera.model';
// templates
import { CameraFilterTemplate } from '@/templates/FILTER';
import { CamerasTableTemplate } from '@/templates/ENTITY_TABLE';
import { CameraInfoModalTemplate } from '@/templates/INFO_MODAL';
import { CameraActionModalTemplate } from '@/templates/ACTION_MODAL';
// tanstack
import { useMutation, useQuery } from '@tanstack/react-query';
// services
import {
	createCameraAPI,
	deleteCameraAPI,
	getCamerasAPI,
	getCarsListAPI,
	updateCameraAPI,
} from '@/services/api-call';
// utilities
import { DefaultDataGenerator, OptionGenerator } from '@/utils/DataGenerator';
import { handleCloseModal, handleOpenModal } from '@/utils/ModalController';
import { WindowWidthObserver } from '@/utils/WidthObserver';
import Table from '@/components/module/Table/Table';

export default function Home() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(CameraFilterTemplate(1));
	const defaultData = DefaultDataGenerator(
		CameraActionModalTemplate(isUseCompactModal)
	);

	const [search, setSearch] = useState<IGetCamerasRequest>(defaultFilterData);

	const {
		isLoading: camerasLoading,
		data: cameras,
		refetch: refetchGetCameras,
	} = useQuery({
		queryKey: ['getCameras'],
		queryFn: async () => await getCamerasAPI(search),
	});

	const { data: carsList, refetch: refetchGetCarsList } = useQuery({
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
		onError: (error) => {
			console.log(error);
			enqueueSnackbar('Fail to update a Camera', { variant: 'error' });
		},
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

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetCameras();
		refetchGetCarsList();
	};

	const options = [
		{
			id: 'position',
			option: [
				{
					value: 'Front',
					label: 'Front',
				},
				{
					value: 'Back',
					label: 'Back',
				},
			],
		},
		{
			id: 'car_id',
			option: OptionGenerator(carsList),
		},
	];

	return (
		<>
			<InputModal
				title={MODAL_LABEL.REGISTER_CAMERA}
				variant={BUTTON_LABEL.REGISTER}
				template={CameraActionModalTemplate(isUseCompactModal)}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createCamera.mutate(registerModalData)}
				options={options}
			/>
			<InfoModal
				title={informModalData.name}
				template={CameraInfoModalTemplate(isUseCompactModal)}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_CAMERA + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={CameraActionModalTemplate(isUseCompactModal)}
				open={openUpdateModal}
				onOpenChange={setOpenUpdateModal}
				data={updateModalData}
				onDataChange={setUpdateModalData}
				onSubmit={() =>
					updateCamera.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
				options={options}
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' camera'}
				onSubmit={() => deleteCamera.mutate(deleteModalData)}
			/>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERAS} />
				<Card className="w-full min-w-[306px] min-h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={CameraFilterTemplate}
							handleSubmitSearch={refetchGetCameras}
							search={search}
							setSearch={setSearch}
							handleClearSearch={() => setSearch(defaultFilterData)}
							options={options}
						/>
						<Divider />
						<Table
							numberOfRow={(cameras ?? []).length}
							registerLabel={BUTTON_LABEL.REGISTER_CAMERA}
							handleOnClickRegister={() =>
								handleOpenModal(
									defaultData,
									setOpenRegisterModal,
									setRegisterModalData
								)
							}
							handleOnClickRefresh={handleOnClickRefresh}
							columns={CamerasTableTemplate}
							rows={(cameras as ICamera[]) ?? []}
							handleOnClickInformation={(data) =>
								handleOpenModal(data, setOpenInformModal, setInformModalData)
							}
							handleOnClickUpdate={(data) =>
								handleOpenModal(data, setOpenUpdateModal, setUpdateModalData)
							}
							handleOnClickDelete={(data) =>
								handleOpenModal(data, setOpenDeleteModal, setDeleteModalData)
							}
							isLoading={camerasLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
