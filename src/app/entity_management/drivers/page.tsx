'use client';
// react
import { useEffect, useState } from 'react';
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
// tanstack
import { useMutation, useQuery } from '@tanstack/react-query';
// services
import {
	createDriverAPI,
	deleteDriverAPI,
	getDriversAPI,
	updateDriverAPI,
} from '@/services/api-call';
// utilities
import { DefaultDataGenerator } from '@/utils/DataGenerator';
import { handleCloseModal, handleOpenModal } from '@/utils/ModalController';
import { WindowWidthObserver } from '@/utils/WidthObserver';

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();

	// handle responsive modal
	const [windowWidth, setWindowWidth] = useState(1000);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	// generate default data
	const defaultFilterData = DefaultDataGenerator(DriverFilterTemplate);
	const defaultData = DefaultDataGenerator(DriverActionModalTemplate);
	const defaultInfoData = DefaultDataGenerator(DriverInfoModalTemplate);

	// states
	const [search, setSearch] = useState<IGetDriversRequest>(defaultFilterData);
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

	// query
	const {
		isLoading: isDriversLoading,
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
		onError: (error) =>
			enqueueSnackbar(`Fail to register a Drive : ${error.message}`, {
				variant: 'error',
			}),
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
		onError: (error) =>
			enqueueSnackbar(`Fail to update a Driver : ${error.message}`, {
				variant: 'error',
			}),
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
		onError: (error) =>
			enqueueSnackbar(`Fail to delete a Driver : ${error.message}`, {
				variant: 'error',
			}),
	});

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetDrivers();
	};

	return (
		<>
			<InputModal
				title={MODAL_LABEL.REGISTER_DRIVER}
				variant={BUTTON_LABEL.REGISTER}
				template={DriverActionModalTemplate}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createDriver.mutate(registerModalData)}
				isPending={createDriver.isPending}
				isCompact={isUseCompactModal}
			/>
			<InfoModal
				title={informModalData.name}
				template={DriverInfoModalTemplate}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
				isCompact={isUseCompactModal}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_DRIVER + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={DriverActionModalTemplate}
				open={openUpdateModal}
				onOpenChange={setOpenUpdateModal}
				data={updateModalData}
				onDataChange={setUpdateModalData}
				onSubmit={() =>
					updateDriver.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
				isPending={updateDriver.isPending}
				isCompact={isUseCompactModal}
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' driver'}
				onSubmit={() => deleteDriver.mutate(deleteModalData)}
				isPending={deleteDriver.isPending}
			/>
			<div className="flex flex-col w-full min-w-[300px] h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.DRIVERS} />
				<Card className="flex flex-col gap-16 w-full min-w-[300px] h-auto rounded-lg px-32 py-24">
					<Filter
						template={DriverFilterTemplate}
						handleSubmitSearch={refetchGetDrivers}
						search={search}
						setSearch={setSearch}
						handleClearSearch={() => setSearch(defaultFilterData)}
					/>
					<Divider />
					<Table
						numberOfRow={(drivers ?? []).length}
						registerLabel={BUTTON_LABEL.REGISTER_DRIVER}
						handleOnClickRegister={() =>
							handleOpenModal(
								defaultData,
								setOpenRegisterModal,
								setRegisterModalData
							)
						}
						handleOnClickRefresh={handleOnClickRefresh}
						columns={DriversTableTemplate}
						rows={drivers ?? []}
						handleOnClickInformation={(data: IDriver) =>
							handleOpenModal(data, setOpenInformModal, setInformModalData)
						}
						handleOnClickUpdate={(data: IDriver) =>
							handleOpenModal(
								data as IDriverInput,
								setOpenUpdateModal,
								setUpdateModalData
							)
						}
						handleOnClickDelete={(data: IDriver) =>
							handleOpenModal(
								data as IDriverInput,
								setOpenDeleteModal,
								setDeleteModalData
							)
						}
						isLoading={isDriversLoading}
					/>
				</Card>
			</div>
		</>
	);
}
