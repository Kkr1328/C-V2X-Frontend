'use client';
// react
import { useEffect, useState } from 'react';
// notisnack
import { useSnackbar } from 'notistack';
// material ui
import { Card, Divider, Stack } from '@mui/material';
// components
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter/Filter';
import DeleteModal from '@/components/module/Modal/DeleteModal';
import InputModal from '@/components/module/Modal/InputModal';
import InfoModal from '@/components/module/Modal/InfoModal';
// consts
import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { IGetRSUsRequest, IRSU } from '@/types/models/rsu.model';
// templates
import { RSUFilterTemplate } from '@/templates/FILTER';
import { RSUsTableTemplate } from '@/templates/ENTITY_TABLE';
import { RSUInfoModalTemplate } from '@/templates/INFO_MODAL';
import { RSUActionModalTemplate } from '@/templates/ACTION_MODAL';
// tanstack
import { useMutation, useQuery } from '@tanstack/react-query';
// services
import {
	createRSUAPI,
	deleteRSUAPI,
	getRSUsAPI,
	updateRSUAPI,
} from '@/services/api-call';
// utilities
import { DefaultDataGenerator } from '@/utils/DataGenerator';
import { handleCloseModal, handleOpenModal } from '@/utils/ModalController';
import { WindowWidthObserver } from '@/utils/WidthObserver';
import Table from '@/components/module/Table/Table';

export default function Home() {
	const [windowWidth, setWindowWidth] = useState(0);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(RSUFilterTemplate(1));
	const defaultData = DefaultDataGenerator(
		RSUActionModalTemplate(isUseCompactModal)
	);

	const [search, setSearch] = useState<IGetRSUsRequest>(defaultFilterData);

	const {
		isLoading: rsusLoading,
		data: rsus,
		refetch: refetchGetRSUs,
	} = useQuery({
		queryKey: ['getRSUs'],
		queryFn: async () => await getRSUsAPI(search),
	});

	const createRSU = useMutation({
		mutationFn: createRSUAPI,
		onSuccess: () => {
			refetchGetRSUs();
			handleCloseModal(defaultData, setOpenRegisterModal, setRegisterModalData);
			enqueueSnackbar('Register a RSU successfully', {
				variant: 'success',
			});
		},
		onError: (error) => {
			enqueueSnackbar(`Fail to create a RSU : ${error.message}`, {
				variant: 'error',
			});
		},
	});

	const updateRSU = useMutation({
		mutationFn: updateRSUAPI,
		onSuccess: () => {
			refetchGetRSUs();
			handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData);
			enqueueSnackbar('Update a RSU successfully', {
				variant: 'success',
			});
		},
		onError: (error) =>
			enqueueSnackbar(`Fail to update a RSU : ${error.message}`, {
				variant: 'error',
			}),
	});

	const deleteRSU = useMutation({
		mutationFn: deleteRSUAPI,
		onSuccess: () => {
			refetchGetRSUs();
			handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData);
			enqueueSnackbar('Delete a RSU successfully', {
				variant: 'success',
			});
		},
		onError: (error) =>
			enqueueSnackbar(`Fail to delete a RSU : ${error.message}`, {
				variant: 'error',
			}),
	});

	// Open-Close modal state
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	// Modal data state
	const [informModalData, setInformModalData] = useState<IRSU>(defaultData);
	const [registerModalData, setRegisterModalData] = useState<IRSU>(defaultData);
	const [updateModalData, setUpdateModalData] = useState<IRSU>(defaultData);
	const [deleteModalData, setDeleteModalData] = useState<IRSU>(defaultData);

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetRSUs();
	};

	return (
		<>
			<InputModal
				title={MODAL_LABEL.REGISTER_RSU}
				variant={BUTTON_LABEL.REGISTER}
				template={RSUActionModalTemplate(isUseCompactModal)}
				open={openRegisterModal}
				onOpenChange={setOpenRegisterModal}
				data={registerModalData}
				onDataChange={setRegisterModalData}
				onSubmit={() => createRSU.mutate(registerModalData)}
			/>
			<InfoModal
				title={informModalData.name}
				template={RSUInfoModalTemplate(isUseCompactModal)}
				open={openInformModal}
				onOpenChange={setOpenInformModal}
				data={informModalData}
				onDataChange={setInformModalData}
			/>
			<InputModal
				title={MODAL_LABEL.UPDATE_RSU + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				template={RSUActionModalTemplate(isUseCompactModal)}
				open={openUpdateModal}
				onOpenChange={setOpenUpdateModal}
				data={updateModalData}
				onDataChange={setUpdateModalData}
				onSubmit={() =>
					updateRSU.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
			/>
			<DeleteModal
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				entity={deleteModalData.id + ' RSU'}
				onSubmit={() => deleteRSU.mutate(deleteModalData)}
			/>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.RSUS} />
				<Card className="max-w-full min-w-[306px] min-h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={RSUFilterTemplate}
							handleSubmitSearch={refetchGetRSUs}
							search={search}
							setSearch={setSearch}
							handleClearSearch={() => setSearch(defaultFilterData)}
						/>
						<Divider />
						<Table
							numberOfRow={(rsus ?? []).length}
							registerLabel={BUTTON_LABEL.REGISTER_RSU}
							handleOnClickRegister={() =>
								handleOpenModal(
									defaultData,
									setOpenRegisterModal,
									setRegisterModalData
								)
							}
							handleOnClickRefresh={handleOnClickRefresh}
							columns={RSUsTableTemplate}
							rows={rsus ?? []}
							handleOnClickInformation={(data) =>
								handleOpenModal(data, setOpenInformModal, setInformModalData)
							}
							handleOnClickUpdate={(data) =>
								handleOpenModal(data, setOpenUpdateModal, setUpdateModalData)
							}
							handleOnClickDelete={(data) =>
								handleOpenModal(data, setOpenDeleteModal, setDeleteModalData)
							}
							isLoading={rsusLoading}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
