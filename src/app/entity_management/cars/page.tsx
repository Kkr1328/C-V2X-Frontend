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
import { ICar, ICarInfo, IGetCarsRequest } from '@/types/models/car.model';
// templates
import { CarFilterTemplate } from '@/templates/FILTER';
import { CarsTableTemplate } from '@/templates/ENTITY_TABLE';
import { CarInfoModalTemplate } from '@/templates/INFO_MODAL';
import { CarActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetCars } from '@/redux/get-cars/get-cars-selector';
import { selectCreateCar } from '@/redux/create-car/create-car-selector';
import { selectUpdateCar } from '@/redux/update-car/update-car-selector';
import { selectDeleteCar } from '@/redux/delete-car/delete-car-selector';
import { selectGetCamerasList } from '@/redux/get-cameras-list/get-cameras-list-selector';
import { selectGetDriversList } from '@/redux/get-drivers-list/get-drivers-list-selector';
import { FETCH_GET_CARS } from '@/redux/get-cars/get-cars-action';
import { FETCH_CREATE_CAR } from '@/redux/create-car/create-car-action';
import { FETCH_UPDATE_CAR } from '@/redux/update-car/update-car-action';
import { FETCH_DELETE_CAR } from '@/redux/delete-car/delete-car-action';
import { FETCH_GET_CAMERAS_LIST } from '@/redux/get-cameras-list/get-cameras-list-action';
import { FETCH_GET_DRIVERS_LIST } from '@/redux/get-drivers-list/get-drivers-list-action';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: cars, loading: carsLoading } = useSelector(selectGetCars);
	const { data: camerasList } = useSelector(selectGetCamerasList);
	const { data: driversList } = useSelector(selectGetDriversList);
	const { error: registerCarError, loading: registerCarLoading } =
		useSelector(selectCreateCar);
	const { error: updateCarError, loading: updateCarLoading } =
		useSelector(selectUpdateCar);
	const { error: deleteCarError, loading: deleteCarLoading } =
		useSelector(selectDeleteCar);

	// Open-Close modal state
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = CarActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as ICar[keyof ICar],
		}),
		{} as ICar
	);

	const defaultInfoData = CarActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as ICarInfo[keyof ICarInfo],
		}),
		{} as ICarInfo
	);

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

	// Register modal
	const handleOpenRegisterModel = () => setOpenRegisterModal(true);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultData);
	};
	const handleRegisterNotification = () => {
		if (!registerCarError) {
			enqueueSnackbar('Register a RSU successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to register a RSU', { variant: 'error' });
		}
	};
	const handleSubmitRegisterModal = () => {
		dispatch(
			FETCH_CREATE_CAR({
				name: registerModalData.name,
				license_plate: registerModalData.license_plate,
				model: registerModalData.model,
				driver_id: registerModalData.driver_id || '',
			})
		).then(refetchData);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: ICar) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleUpdateNotification = () => {
		if (!updateCarError) {
			enqueueSnackbar('Update a RSU successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to update a RSU', { variant: 'error' });
		}
	};
	const handleSubmitUpdateModal = () => {
		dispatch(
			FETCH_UPDATE_CAR({
				query: { id: updateModalData.id },
				request: {
					name: updateModalData.name,
					license_plate: updateModalData.license_plate,
					model: updateModalData.model,
					driver_id: updateModalData.driver_id || '',
				},
			})
		).then(refetchData);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: ICar) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteCarError) {
			enqueueSnackbar('Delete a RSU successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a RSU', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_CAR({ id: deleteModalData.id })).then(refetchData);
		handleCloseDeleteModal();
	};

	const refetchData = () => {
		dispatch(FETCH_GET_CARS({}));
		dispatch(FETCH_GET_CAMERAS_LIST());
		dispatch(FETCH_GET_DRIVERS_LIST());
	};
	const handleOnSearch = (search: IGetCarsRequest) =>
		dispatch(FETCH_GET_CARS(search));
	const generateOptions = () => {
		const cameraOption =
			camerasList?.map((camera) => {
				return { value: camera.id, label: camera.name };
			}) || [];
		const driverOption =
			driversList?.map((driver) => {
				return { value: driver.id, label: driver.name };
			}) || [];
		return [
			{
				id: 'front_cam_id',
				option: cameraOption,
			},
			{
				id: 'back_cam_id',
				option: cameraOption,
			},
			{
				id: 'driver_id',
				option: driverOption,
			},
		];
	};

	useEffect(() => {
		refetchData();
	}, []);

	useEffect(() => {
		if (!registerCarLoading && registerCarLoading !== undefined) {
			handleRegisterNotification();
		}
		if (!updateCarLoading && updateCarLoading !== undefined) {
			handleUpdateNotification();
		}
		if (!deleteCarLoading && deleteCarLoading !== undefined) {
			handleDeleteNotification();
		}
	}, [registerCarLoading, updateCarLoading, deleteCarLoading]);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAR}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
			>
				<ModalInputs
					template={CarActionModalTemplate}
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
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
			>
				<ModalInputs
					template={CarActionModalTemplate}
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
							handleSubmitSearch={handleOnSearch}
							options={generateOptions()}
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
								onClick={handleOpenRegisterModel}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
							/>
						</Stack>
						<TableCV2X<ICar>
							columns={CarsTableTemplate}
							rows={cars ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={handleOpenUpdateModal}
							handleOnClickDelete={handleOpenDeleteModal}
							isLoading={carsLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
