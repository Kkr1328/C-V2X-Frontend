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

export default function Home() {
	const { enqueueSnackbar } = useSnackbar();
	const defaultFilterData = DefaultDataGenerator(RSUFilterTemplate);
	const defaultData = DefaultDataGenerator(RSUActionModalTemplate);

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
		onError: () =>
			enqueueSnackbar('Fail to update a RSU', { variant: 'error' }),
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
		onError: () =>
			enqueueSnackbar('Fail to update a RSU', { variant: 'error' }),
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
		onError: () =>
			enqueueSnackbar('Fail to delete a RSU', { variant: 'error' }),
	});

	const getSearch = (id: keyof IGetRSUsRequest) => {
		if (search) {
			return search[id] as string;
		}
		return '';
	};
	const handleSearchChange = (id: keyof IGetRSUsRequest, value: string) => {
		setSearch({
			...search,
			[id]: value,
		} as IGetRSUsRequest);
	};
	const handleClearSearch = () => {
		setSearch(defaultFilterData);
	};

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

	const handleOpenModal = (
		modalData: IRSU,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<IRSU>>
	) => {
		setOpenModal(true);
		setModalData(modalData);
	};

	const handleCloseModal = (
		defalutData: IRSU,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		setModalData: React.Dispatch<React.SetStateAction<IRSU>>
	) => {
		setModalData(defalutData);
		setOpenModal(false);
	};

	const handleOnClickRefresh = async () => {
		await setSearch(defaultFilterData);
		refetchGetRSUs();
	};

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_RSU}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={() =>
					handleCloseModal(
						defaultData,
						setOpenRegisterModal,
						setRegisterModalData
					)
				}
				onSubmit={() => createRSU.mutate(registerModalData)}
			>
				<ModalInputs
					template={RSUActionModalTemplate}
					data={registerModalData}
					onDataChange={setRegisterModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={informModalData.name}
				variant={'Inform'}
				open={openInformModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenInformModal, setInformModalData)
				}
			>
				<ModalInputs
					template={RSUInfoModalTemplate}
					data={informModalData}
					onDataChange={setInformModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_RSU + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenUpdateModal, setUpdateModalData)
				}
				onSubmit={() =>
					updateRSU.mutate({
						query: updateModalData,
						request: updateModalData,
					})
				}
			>
				<ModalInputs
					template={RSUActionModalTemplate}
					data={updateModalData}
					onDataChange={setUpdateModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.ARE_YOU_SURE}
				variant={BUTTON_LABEL.DELETE}
				open={openDeleteModal}
				handleOnClose={() =>
					handleCloseModal(defaultData, setOpenDeleteModal, setDeleteModalData)
				}
				onSubmit={() => deleteRSU.mutate(deleteModalData)}
			>
				<p>
					{MODAL_LABEL.DO_YOU_REALLY_DELETE +
						deleteModalData.id +
						' RSU' +
						MODAL_LABEL.THIS_PROCESS_CANNOT_UNDONE}
				</p>
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.RSUS} />
				<Card className="w-full h-[calc(100vh-192px)] rounded-lg px-32 py-24">
					<Stack className="h-full flex flex-col gap-16">
						<Filter
							template={RSUFilterTemplate}
							handleSubmitSearch={refetchGetRSUs}
							getSearch={getSearch}
							handleSearchChange={handleSearchChange}
							handleClearSearch={handleClearSearch}
						/>
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total (${
								rsus?.length || 0
							})`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_RSU}
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
						<TableCV2X<IRSU>
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
