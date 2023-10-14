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
import { CarsProps } from '@/types/ENTITY';
import { IGetCarsRequest } from '@/types/models/car.model';
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
import { FETCH_GET_CARS } from '@/redux/get-cars/get-cars-action';
import { FETCH_CREATE_CAR } from '@/redux/create-car/create-car-action';
import { FETCH_UPDATE_CAR } from '@/redux/update-car/update-car-action';
import { FETCH_DELETE_CAR } from '@/redux/delete-car/delete-car-action';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: cars } = useSelector(selectGetCars);
	const { error: createCarError } = useSelector(selectCreateCar);
	const { error: updateCarError } = useSelector(selectUpdateCar);
	const { error: deleteCarError } = useSelector(selectDeleteCar);

	// Open-Close modal state
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = CarActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as CarsProps[keyof CarsProps],
		}),
		{} as CarsProps
	);

	// Modal data state
	const [informModalData, setInformModalData] =
		useState<CarsProps>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<CarsProps>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<CarsProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<CarsProps>(defaultData);

	// Inform modal
	const handleOpenInformModal = (informData: CarsProps) => {
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
		if (!createCarError) {
			enqueueSnackbar('Register a RSU sucessfully', {
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
				front_cam_id: registerModalData.front_camera || '',
				back_cam_id: registerModalData.back_camera || '',
			})
		)
			.then(refetchData)
			.then(handleRegisterNotification);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: CarsProps) => {
		setUpdateModalData(updateData);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleUpdateNotification = () => {
		if (!updateCarError) {
			enqueueSnackbar('Update a RSU sucessfully', {
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
					front_cam_id: updateModalData.front_camera || '',
					back_cam_id: updateModalData.back_camera || '',
				},
			})
		)
			.then(refetchData)
			.then(handleUpdateNotification);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: CarsProps) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteCarError) {
			enqueueSnackbar('Delete a RSU sucessfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a RSU', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_CAR({ id: deleteModalData.id }))
			.then(refetchData)
			.then(handleDeleteNotification);
		handleCloseDeleteModal();
	};

	const refetchData = () => dispatch(FETCH_GET_CARS({}));
	const handleOnSearch = (search: IGetCarsRequest) =>
		dispatch(FETCH_GET_CARS(search));

	useEffect(() => {
		refetchData();
	}, []);

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
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
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
						<TableCV2X<CarsProps>
							columns={CarsTableTemplate}
							rows={(cars as CarsProps[]) ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={handleOpenUpdateModal}
							handleOnClickDelete={(deleteData: CarsProps) => {
								setDeleteModalData(deleteData);
								setOpenDeleteModal(true);
							}}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
