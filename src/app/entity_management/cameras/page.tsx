'use client';
// react
import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/navigation';
// notisnack
import { useSnackbar } from 'notistack';
// material ui
import { Card, Divider } from '@mui/material';
// components
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter/Filter';
import InputModal from '@/components/module/Modal/InputModal';
import InfoModal from '@/components/module/Modal/InfoModal';
import DeleteModal from '@/components/module/Modal/DeleteModal';
import Table from '@/components/module/Table/Table';
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
import {
	cameraStatus,
	carStatus,
	handleCarLocate,
} from '@/utils/FleetRetriever';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	// handle responsive modal
	const [windowWidth, setWindowWidth] = useState(1000);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	// generate default data
	const defaultFilterData = DefaultDataGenerator(CameraFilterTemplate);
	const defaultData = DefaultDataGenerator(CameraActionModalTemplate);

	// states
	const [search, setSearch] = useState<IGetCamerasRequest>(defaultFilterData);
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

	//query
	const {
		isLoading: isCamerasLoading,
		data: cameras,
		refetch: refetchGetCameras,
	} = useQuery({
		queryKey: ['getCameras'],
		queryFn: async () => await getCamerasAPI(search),
	});
	const {
		isLoading: isCarsListLoading,
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
		onError: (error) =>
			enqueueSnackbar(`Fail to register a Camera : ${error.message}`, {
				variant: 'error',
			}),
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
			enqueueSnackbar(`Fail to update a Camera : ${error.message}`, {
				variant: 'error',
			});
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
		onError: (error) =>
			enqueueSnackbar(`Fail to delete a Camera : ${error.message}`, {
				variant: 'error',
			}),
	});

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetCameras();
		refetchGetCarsList();
	};

	const options = [
		{
			id: 'position',
			option: ['Front', 'Back', 'Left', 'Right'].map((position) => ({
				value: position,
				label: position,
			})),
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
				template={CameraActionModalTemplate}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createCamera.mutate(registerModalData)}
				isPending={createCamera.isPending}
				options={options}
				isCompact={isUseCompactModal}
			/>
			<InfoModal
				title={informModalData.name}
				template={CameraInfoModalTemplate}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
				headerPill={cameraStatus(
					informModalData.position,
					informModalData.car_id
				)}
				isBodyLocate
				handleBodyLocate={handleCarLocate(router, informModalData.car_id)}
				setBodyPill={() => carStatus(informModalData.car_id)}
				isCompact={isUseCompactModal}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_CAMERA + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={CameraActionModalTemplate}
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
				isPending={updateCamera.isPending}
				options={options}
				isCompact={isUseCompactModal}
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' camera'}
				onSubmit={() => deleteCamera.mutate(deleteModalData)}
				isPending={deleteCamera.isPending}
			/>
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERAS} />
				<Card className="flex flex-col gap-16 w-full min-w-[300px] h-auto rounded-lg px-32 py-24">
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
						handleOnClickInformation={(data: ICamera) =>
							handleOpenModal(data, setOpenInformModal, setInformModalData)
						}
						handleOnClickUpdate={(data: ICamera) =>
							handleOpenModal(data, setOpenUpdateModal, setUpdateModalData)
						}
						handleOnClickDelete={(data: ICamera) =>
							handleOpenModal(data, setOpenDeleteModal, setDeleteModalData)
						}
						isLoading={isCamerasLoading || isCarsListLoading}
					/>
				</Card>
			</div>
		</>
	);
}
