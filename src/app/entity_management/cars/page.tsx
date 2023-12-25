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
import TableController from '@/components/module/Table/TableController';
import TableCV2X from '@/components/module/Table/TableCV2X';
import InputModal from '@/components/module/Modal/InputModal';
import InfoModal from '@/components/module/Modal/InfoModal';
import DeleteModal from '@/components/module/Modal/DeleteModal';
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
import { handleCloseModal, handleOpenModal } from '@/utils/ModalController';
import {
	FilterFieldPerRowGenerator,
	WidthObserver,
	WindowWidthObserver,
} from '@/utils/WidthObserver';

export default function Home() {
	const filterRef = useRef<HTMLDivElement>(null);
	const [filterWidth, setFilterWidth] = useState<number>(
		filterRef.current?.clientWidth as number
	);
	useEffect(
		() => WidthObserver(filterRef.current, setFilterWidth),
		[filterRef.current]
	);
	const fieldPerRow = FilterFieldPerRowGenerator(filterWidth);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(
		CarFilterTemplate(fieldPerRow)
	);
	const defaultData = DefaultDataGenerator(
		CarActionModalTemplate(isUseCompactModal)
	);
	const defaultInfoData = DefaultDataGenerator(
		CarInfoModalTemplate(isUseCompactModal)
	);

	const [search, setSearch] = useState<IGetCarsRequest>(defaultFilterData);

	const {
		isLoading: carsLoading,
		data: cars,
		refetch: refetchGetCars,
	} = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI(search),
	});

	const { data: camerasList, refetch: refetchGetCamerasList } = useQuery({
		queryKey: ['getCamerasList'],
		queryFn: async () => await getCamerasListAPI(),
	});

	const { data: driversList, refetch: refetchGetDriversList } = useQuery({
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

	const getSearch = (id: keyof IGetCarsRequest) => {
		return search ? (search[id] as string) : '';
	};

	const handleSearchChange = (id: keyof IGetCarsRequest, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as IGetCarsRequest);
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
			id: 'driver_id',
			option: OptionGenerator(driversList),
		},
	];

	return (
		<>
			<InputModal
				title={MODAL_LABEL.REGISTER_CAR}
				variant={BUTTON_LABEL.REGISTER}
				template={CarActionModalTemplate(isUseCompactModal)}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createCar.mutate(registerModalData)}
				options={options}
			/>
			<InfoModal
				title={informModalData.name}
				template={CarInfoModalTemplate(isUseCompactModal)}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_CAR + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={CarActionModalTemplate(isUseCompactModal)}
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
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' car'}
				onSubmit={() => deleteCar.mutate(deleteModalData)}
			/>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CARS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							filterRef={filterRef}
							template={CarFilterTemplate(fieldPerRow)}
							fieldPerRow={fieldPerRow}
							handleSubmitSearch={refetchGetCars}
							search={search}
							setSearch={setSearch}
							handleClearSearch={() => setSearch(defaultFilterData)}
							options={options}
						/>
						<Divider />
						<TableController
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
						/>
						<TableCV2X
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
