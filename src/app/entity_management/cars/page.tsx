'use client';
// react
import { useState } from 'react';
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
import { DefaultDataGenerator, OptionGenerator } from '@/utils/DataGenerator';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(CarFilterTemplate);
	const defaultData = DefaultDataGenerator(CarActionModalTemplate);
	const defaultInfoData = DefaultDataGenerator(CarInfoModalTemplate);

	const [search, setSearch] = useState<IGetCarsRequest>(defaultFilterData);

	const {
		isLoading: carsLoading,
		data: cars,
		refetch: refetchGetCars,
	} = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI(search),
	});

	const {
		isLoading: camerasListLoading,
		data: camerasList,
		refetch: refetchGetCamerasList,
	} = useQuery({
		queryKey: ['getCamerasList'],
		queryFn: async () => await getCamerasListAPI(),
	});

	const {
		isLoading: driversListLoading,
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
		onError: () =>
			enqueueSnackbar('Fail to update a Car', { variant: 'error' }),
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
		onError: () =>
			enqueueSnackbar('Fail to update a Car', { variant: 'error' }),
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
		onError: () =>
			enqueueSnackbar('Fail to delete a Car', { variant: 'error' }),
	});

	const handleOpenModal = (
		modalData: ICar,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<ICar>>
	) => {
		setOpenModal(true);
		setModalData(modalData);
	};

	const handleCloseModal = (
		defalutData: ICar,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<ICar>>
	) => {
		setModalData(defalutData);
		setOpenModal(false);
	};

	const getSearch = (id: keyof IGetCarsRequest) => {
		if (search) {
			return search[id] as string;
		}
		return '';
	};

	const handleSearchChange = (id: keyof IGetCarsRequest, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as IGetCarsRequest);
	};

	const handleClearSearch = () => {
		setSearch(defaultFilterData);
	};

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

	// Inform modal
	const handleOpenInformModal = (informData: ICar) => {
		const front_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Front')[0];
		const back_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Back')[0];
		setInformModalData({
			...informData,
			front_cam_position: front_cam ? front_cam.position : '',
			front_cam_name: front_cam ? front_cam.name : '',
			back_cam_position: back_cam ? back_cam.position : '',
			back_cam_name: back_cam ? back_cam.name : '',
		});
		setOpenInformModal(true);
	};
	const handleCloseInformModal = () => setOpenInformModal(false);

	const refetchData = () => {
		refetchGetCars();
		refetchGetCamerasList();
		refetchGetDriversList();
	};

	const handleOnClickRefresh = async () => {
		await handleClearSearch();
		refetchData();
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
			id: 'driver_id',
			option: OptionGenerator(driversList),
		},
	];

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAR}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={() =>
					handleCloseModal(
						defaultData,
						setOpenRegisterModal,
						setRegisterModalData
					)
				}
				onSubmit={() => createCar.mutate(registerModalData)}
			>
				<ModalInputs
					template={CarActionModalTemplate}
					data={registerModalData}
					onDataChange={setRegisterModalData}
					options={options}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={informModalData.name}
				variant={'Inform'}
				open={openInformModal}
				handleOnClose={handleCloseInformModal}
			>
				<ModalInputs
					template={CarInfoModalTemplate}
					data={informModalData}
					onDataChange={setInformModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_CAR + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData)
				}
				onSubmit={() =>
					updateCar.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
			>
				<ModalInputs
					template={CarActionModalTemplate}
					data={updateModalData}
					onDataChange={setUpdateModalData}
					options={options}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.ARE_YOU_SURE}
				variant={BUTTON_LABEL.DELETE}
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				onSubmit={() => deleteCar.mutate(deleteModalData)}
			>
				<p>
					{MODAL_LABEL.DO_YOU_REALLY_DELETE +
						deleteModalData.id +
						' car' +
						MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE}
				</p>
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CARS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={CarFilterTemplate}
							handleSubmitSearch={refetchGetCars}
							getSearch={getSearch}
							handleSearchChange={handleSearchChange}
							handleClearSearch={handleClearSearch}
							options={options}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total (${
								cars?.length || 0
							})`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_CAR}
								variant="contained"
								onClick={() =>
									handleOpenModal(
										defaultData,
										setOpenRegisterModal,
										setRegisterModalData
									)
								}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
								onClick={handleOnClickRefresh}
							/>
						</Stack>
						<TableCV2X<ICar>
							columns={CarsTableTemplate}
							rows={cars ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={(data) =>
								handleOpenModal(data, setOpenUpdateModal, setUpdateModalData)
							}
							handleOnClickDelete={(data) =>
								handleOpenModal(data, setOpenDeleteModal, setDeleteModalData)
							}
							isLoading={carsLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
