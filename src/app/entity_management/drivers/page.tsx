'use client';
// react
import { Fragment, useEffect, useState } from 'react';
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
import {
	IDriver,
	IDriverInput,
	IGetDriversRequest,
} from '@/types/models/driver.model';
// templates
import { DriverFilterTemplate } from '@/templates/FILTER';
import { DriversTableTemplate } from '@/templates/ENTITY_TABLE';
import { DriverInfoModalTemplate } from '@/templates/INFO_MODAL';
import { DriverActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetDrivers } from '@/redux/get-drivers/get-drivers-selector';
import { selectCreateDriver } from '@/redux/create-driver/create-driver-selector';
import { selectUpdateDriver } from '@/redux/update-driver/update-driver-selector';
import { selectDeleteDriver } from '@/redux/delete-driver/delete-driver-selector';
import { FETCH_GET_DRIVERS } from '@/redux/get-drivers/get-drivers-action';
import { FETCH_CREATE_DRIVER } from '@/redux/create-driver/create-driver-action';
import { FETCH_UPDATE_DRIVER } from '@/redux/update-driver/update-driver-action';
import { FETCH_DELETE_DRIVER } from '@/redux/delete-driver/delete-driver-action';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: drivers, loading: driversLoading } =
		useSelector(selectGetDrivers);
	const { error: registerDriverError, loading: registerDriverLoading } =
		useSelector(selectCreateDriver);
	const { error: updateDriverError, loading: updateDriverLoading } =
		useSelector(selectUpdateDriver);
	const { error: deleteDriverError, loading: deleteDriverLoading } =
		useSelector(selectDeleteDriver);

	const defaultFilterData = DriverFilterTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as IGetDriversRequest[keyof IGetDriversRequest],
		}),
		{} as IGetDriversRequest
	);

	// fiiter state
	const [search, setSearch] = useState<IGetDriversRequest>(defaultFilterData);

	const getSearch = (id: keyof IGetDriversRequest) => {
		if (search) {
			return search[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof IGetDriversRequest, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as IGetDriversRequest);
	};
	const handleClearSearch = () => {
		setSearch(defaultFilterData);
	};
	const handleOnSearch = () => dispatch(FETCH_GET_DRIVERS(search));

	// Open-Close modal state
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = DriverActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as IDriver[keyof IDriver],
		}),
		{} as IDriver
	);

	const defaultInputData = DriverActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as IDriverInput[keyof IDriverInput],
		}),
		{} as IDriverInput
	);

	// Modal data state
	const [informModalData, setInformModalData] = useState<IDriver>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<IDriverInput>(defaultInputData);
	const [updateModalData, setUpdateModalData] =
		useState<IDriverInput>(defaultInputData);
	const [deleteModalData, setDeleteModalData] = useState<IDriver>(defaultData);

	// Inform modal
	const handleOpenInformModal = (informData: IDriver) => {
		setInformModalData(informData);
		setOpenInformModal(true);
	};
	const handleCloseInformModal = () => setOpenInformModal(false);

	// Register modal
	const handleOpenRegisterModel = () => setOpenRegisterModal(true);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultInputData);
	};
	const handleRegisterNotification = () => {
		if (!registerDriverError) {
			enqueueSnackbar('Register a driver successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to register a driver', { variant: 'error' });
		}
	};
	const handleSubmitRegisterModal = () => {
		dispatch(
			FETCH_CREATE_DRIVER({
				first_name: registerModalData.first_name,
				last_name: registerModalData.last_name,
				phone_no: registerModalData.phone_no,
				username: registerModalData.username,
				password: registerModalData.password || '',
			})
		).then(refetchData);
		handleCloseRegisterModal();
	};

	// Update modal
	const handleOpenUpdateModal = (updateData: IDriver) => {
		setUpdateModalData({
			...updateData,
			password: '',
			confirmed_password: '',
		});
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultInputData);
	};
	const handleUpdateNotification = () => {
		if (!updateDriverError) {
			enqueueSnackbar('Update a driver successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to update a driver', { variant: 'error' });
		}
	};
	const handleSubmitUpdateModal = () => {
		dispatch(
			FETCH_UPDATE_DRIVER({
				query: { id: updateModalData.id },
				request: {
					first_name: updateModalData.first_name,
					last_name: updateModalData.last_name,
					phone_no: updateModalData.phone_no,
					username: updateModalData.username,
					password: updateModalData.password || '',
				},
			})
		).then(refetchData);
		handleCloseUpdateModal();
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: IDriver) => {
		setDeleteModalData(deleteData);
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleDeleteNotification = () => {
		if (!deleteDriverError) {
			enqueueSnackbar('Delete a driver successfully', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar('Fail to delete a driver', { variant: 'error' });
		}
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_DRIVER({ id: deleteModalData.id })).then(refetchData);
		handleCloseDeleteModal();
	};

	const refetchData = () => dispatch(FETCH_GET_DRIVERS({}));

	const handleOnClickRefresh = () => {
		handleClearSearch();
		refetchData();
	};

	useEffect(() => {
		refetchData();
	}, []);

	useEffect(() => {
		if (!registerDriverLoading && registerDriverLoading !== undefined) {
			handleRegisterNotification();
		}
	}, [registerDriverLoading]);

	useEffect(() => {
		if (!updateDriverLoading && updateDriverLoading !== undefined) {
			handleUpdateNotification();
		}
	}, [updateDriverLoading]);

	useEffect(() => {
		if (!deleteDriverLoading && deleteDriverLoading !== undefined) {
			handleDeleteNotification();
		}
	}, [deleteDriverLoading]);

	return (
		<Fragment>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_DRIVER}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
			>
				<ModalInputs
					template={DriverActionModalTemplate}
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
					template={DriverInfoModalTemplate}
					data={informModalData}
					onDataChange={setInformModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_DRIVER + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
			>
				<ModalInputs
					template={DriverActionModalTemplate}
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
						' driver' +
						MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE}
				</p>
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.DRIVERS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={DriverFilterTemplate}
							handleSubmitSearch={handleOnSearch}
							getSearch={getSearch}
							handleSearchChange={handleSearchChange}
							handleClearSearch={handleClearSearch}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total (${
								drivers?.length || 0
							})`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_DRIVER}
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
						<TableCV2X<IDriver>
							columns={DriversTableTemplate}
							rows={drivers ?? []}
							handleOnClickInformation={handleOpenInformModal}
							handleOnClickUpdate={handleOpenUpdateModal}
							handleOnClickDelete={handleOpenDeleteModal}
							isLoading={driversLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</Fragment>
	);
}
