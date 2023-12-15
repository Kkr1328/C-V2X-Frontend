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
import { DefaultDataGenerator } from '@/utils/DataGenerator';
import {
	createDriverAPI,
	deleteDriverAPI,
	getDriversAPI,
	updateDriverAPI,
} from '@/services/api-call';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(DriverFilterTemplate);
	const defaultData = DefaultDataGenerator(DriverActionModalTemplate);
	const defaultInfoData = DefaultDataGenerator(DriverInfoModalTemplate);

	const [search, setSearch] = useState<IGetDriversRequest>(defaultFilterData);

	const {
		isLoading: driversLoading,
		data: drivers,
		refetch: refetchGetDrivers,
	} = useQuery({
		queryKey: ['getDrivers'],
		queryFn: async () => await getDriversAPI(search),
	});

	const createDriver = useMutation({
		mutationFn: createDriverAPI,
		onSuccess: () => {
			refetchGetDrivers();
			handleCloseModal(defaultData, setOpenRegisterModal, setRegisterModalData);
			enqueueSnackbar('Register a Driver successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to update a Driver', { variant: 'error' }),
	});

	const updateDriver = useMutation({
		mutationFn: updateDriverAPI,
		onSuccess: () => {
			refetchGetDrivers();
			handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData);
			enqueueSnackbar('Update a Driver successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to update a Driver', { variant: 'error' }),
	});

	const deleteDriver = useMutation({
		mutationFn: deleteDriverAPI,
		onSuccess: () => {
			refetchGetDrivers();
			handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData);
			enqueueSnackbar('Delete a Driver successfully', {
				variant: 'success',
			});
		},
		onError: () =>
			enqueueSnackbar('Fail to delete a Driver', { variant: 'error' }),
	});

	const handleCloseModal = (
		defalutData: IDriverInput,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<IDriverInput>>
	) => {
		setModalData(defalutData);
		setOpenModal(false);
	};

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

	// Open-Close modal state
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	// Modal data state
	const [informModalData, setInformModalData] =
		useState<IDriver>(defaultInfoData);
	const [registerModalData, setRegisterModalData] =
		useState<IDriverInput>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<IDriverInput>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<IDriverInput>(defaultData);

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
		setRegisterModalData(defaultData);
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
		setUpdateModalData(defaultData);
	};

	// Delete modal
	const handleOpenDeleteModal = (deleteData: IDriver) => {
		setDeleteModalData({
			...deleteData,
			password: '',
			confirmed_password: '',
		});
		setOpenDeleteModal(true);
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};

	const handleOnClickRefresh = async () => {
		await handleClearSearch();
		refetchGetDrivers();
	};

	return (
		<Fragment>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_DRIVER}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={() => createDriver.mutate(registerModalData)}
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
				onSubmit={() =>
					updateDriver.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
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
				onSubmit={() => deleteDriver.mutate(deleteModalData)}
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
							handleSubmitSearch={refetchGetDrivers}
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
