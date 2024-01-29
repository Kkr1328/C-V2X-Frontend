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
import { ICar, ICarInfo, IGetCarsRequest } from '@/types/models/car.model';
// templates
import { CarFilterTemplate } from '@/templates/FILTER';
import { CarsTableTemplate } from '@/templates/ENTITY_TABLE';
import { CarInfoModalTemplate } from '@/templates/INFO_MODAL';
import { CarActionModalTemplate } from '@/templates/ACTION_MODAL';
// tanstack
import { useMutation, useQuery } from '@tanstack/react-query';
// services
import {
	createCarAPI,
	deleteCarAPI,
	getCamerasListAPI,
	getCarsAPI,
	getDriversListAPI,
	updateCarAPI,
} from '@/services/api-call';
// utilities
import {
	CarDataTransformer,
	DefaultDataGenerator,
	OptionGenerator,
} from '@/utils/DataGenerator';
import { handleCloseModal, handleOpenModal } from '@/utils/ModalController';
import { WindowWidthObserver } from '@/utils/WidthObserver';
import {
	cameraStatus,
	carStatus,
	handleCarLocate,
} from '@/utils/FleetRetriever';
import { Position } from '@/types/COMMON';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	// handle responsive modal
	const [windowWidth, setWindowWidth] = useState(1000);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	// generate default data
	const defaultFilterData = DefaultDataGenerator(CarFilterTemplate);
	const defaultData = DefaultDataGenerator(CarActionModalTemplate);
	const defaultInfoData = DefaultDataGenerator(CarInfoModalTemplate);

	// states
	const [search, setSearch] = useState<IGetCarsRequest>(defaultFilterData);
	// Open-Close modal state
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	// Modal data state
	const [informModalData, setInformModalData] =
		useState<ICarInfo>(defaultInfoData);
	const [registerModalData, setRegisterModalData] = useState<ICar>(defaultData);
	const [updateModalData, setUpdateModalData] = useState<ICar>(defaultData);
	const [deleteModalData, setDeleteModalData] = useState<ICar>(defaultData);

	// query
	const {
		isLoading: isCarsLoading,
		data: cars,
		refetch: refetchGetCars,
	} = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI(search),
	});
	const {
		isLoading: isCamerasListLoading,
		data: camerasList,
		refetch: refetchGetCamerasList,
	} = useQuery({
		queryKey: ['getCamerasList'],
		queryFn: async () => await getCamerasListAPI(),
	});
	const {
		isLoading: isDriversListLoading,
		data: driversList,
		refetch: refetchGetDriversList,
	} = useQuery({
		queryKey: ['getDriversList'],
		queryFn: async () => await getDriversListAPI(),
	});
	const createCar = useMutation({
		mutationFn: createCarAPI,
		onSuccess: () => {
			refetchGetCars();
			handleCloseModal(defaultData, setOpenRegisterModal, setRegisterModalData);
			enqueueSnackbar('Register a Car successfully', {
				variant: 'success',
			});
		},
		onError: (error) =>
			enqueueSnackbar(`Fail to register a Car : ${error.message}`, {
				variant: 'error',
			}),
	});
	const updateCar = useMutation({
		mutationFn: updateCarAPI,
		onSuccess: () => {
			refetchGetCars();
			handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData);
			enqueueSnackbar('Update a Car successfully', {
				variant: 'success',
			});
		},
		onError: (error) =>
			enqueueSnackbar(`Fail to update a Car : ${error.message}`, {
				variant: 'error',
			}),
	});
	const deleteCar = useMutation({
		mutationFn: deleteCarAPI,
		onSuccess: () => {
			refetchGetCars();
			handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData);
			enqueueSnackbar('Delete a Car successfully', {
				variant: 'success',
			});
		},
		onError: (error) =>
			enqueueSnackbar(`Fail to delete a Car : ${error.message}`, {
				variant: 'error',
			}),
	});

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetCars();
		refetchGetCamerasList();
		refetchGetDriversList();
	};

	const options = [
		{
			id: 'front_cam_id',
			option: OptionGenerator(camerasList),
		},
		{
			id: 'back_cam_id',
			option: OptionGenerator(camerasList),
		},
		{
			id: 'left_cam_id',
			option: OptionGenerator(camerasList),
		},
		{
			id: 'right_cam_id',
			option: OptionGenerator(camerasList),
		},
		{
			id: 'driver_id',
			option: OptionGenerator(driversList),
		},
	];

	return (
		<>
			<InputModal
				title={MODAL_LABEL.REGISTER_CAR}
				variant={BUTTON_LABEL.REGISTER}
				template={CarActionModalTemplate}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createCar.mutate(registerModalData)}
				options={options}
				isPending={createCar.isPending}
				isCompact={isUseCompactModal}
			/>
			<InfoModal
				title={informModalData.name}
				template={CarInfoModalTemplate}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
				isHeaderLocate
				handleHeaderLocate={handleCarLocate(router, informModalData.id)}
				headerPill={carStatus(informModalData.id)}
				setBodyPill={(position?: Position, id?: string) =>
					cameraStatus(position, id)
				}
				isCompact={isUseCompactModal}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_CAR + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={CarActionModalTemplate}
				open={openUpdateModal}
				onOpenChange={setOpenUpdateModal}
				data={updateModalData}
				onDataChange={setUpdateModalData}
				onSubmit={() =>
					updateCar.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
				options={options}
				isPending={updateCar.isPending}
				isCompact={isUseCompactModal}
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' car'}
				onSubmit={() => deleteCar.mutate(deleteModalData)}
				isPending={deleteCar.isPending}
			/>
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.CARS} />
				<Card className="flex flex-col gap-16 w-full min-w-[400px] h-auto rounded-lg px-32 py-24">
					<Filter
						template={CarFilterTemplate}
						handleSubmitSearch={refetchGetCars}
						search={search}
						setSearch={setSearch}
						handleClearSearch={() => setSearch(defaultFilterData)}
						options={options}
					/>
					<Divider />
					<Table
						numberOfRow={(cars ?? []).length}
						registerLabel={BUTTON_LABEL.REGISTER_CAR}
						handleOnClickRegister={() =>
							handleOpenModal(
								defaultData,
								setOpenRegisterModal,
								setRegisterModalData
							)
						}
						handleOnClickRefresh={handleOnClickRefresh}
						columns={CarsTableTemplate}
						rows={cars ?? []}
						handleOnClickInformation={(data) =>
							handleOpenModal(
								CarDataTransformer(data),
								setOpenInformModal,
								setInformModalData
							)
						}
						handleOnClickUpdate={(data) =>
							handleOpenModal(data, setOpenUpdateModal, setUpdateModalData)
						}
						handleOnClickDelete={(data) =>
							handleOpenModal(data, setOpenDeleteModal, setDeleteModalData)
						}
						isLoading={
							isCarsLoading || isCamerasListLoading || isDriversListLoading
						}
					/>
				</Card>
			</div>
		</>
	);
}
