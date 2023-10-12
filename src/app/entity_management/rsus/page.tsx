'use client';
// react
import { useEffect, useState } from 'react';
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
import { RSUsProps } from '@/types/ENTITY';
// templates
import { RSUFilterTemplate } from '@/templates/FILTER';
import { RSUsTableTemplate } from '@/templates/ENTITY_TABLE';
import { RSUInfoModalTemplate } from '@/templates/INFO_MODAL';
import { RSUActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetRSUs } from '@/redux/get-rsus/get-rsus-selector';
import { FETCH_GET_RSUS } from '@/redux/get-rsus/get-rsus-action';
import { FETCH_CREATE_RSU } from '@/redux/create-rsu/create-rsu-action';
import { FETCH_UPDATE_RSU } from '@/redux/update-rsu/update-rsu-action';
import { FETCH_DELETE_RSU } from '@/redux/delete-rsu/delete-rsu-action';
import { selectCreateRSU } from '@/redux/create-rsu/create-rsu-selector';
import { useSnackbar } from 'notistack';

export default function Home() {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const { data: rsus } = useSelector(selectGetRSUs);
	const { error: createRSUError } = useSelector(selectCreateRSU);

	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = RSUActionModalTemplate.reduce(
		(acc, item) => ({ ...acc, [item.id]: '' as RSUsProps[keyof RSUsProps] }),
		{} as RSUsProps
	);

	const [informModalData, setInformModalData] =
		useState<RSUsProps>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<RSUsProps>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<RSUsProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<RSUsProps>(defaultData);

	const handleCloseInformModal = () => setOpenInformModal(false);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultData);
	};
	const handleSubmitRegisterModal = () => {
		dispatch(
			FETCH_CREATE_RSU({
				name: registerModalData.name,
				recommended_speed: registerModalData.recommended_speed,
			})
		).then(refetchData);
		handleCloseRegisterModal();
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleSubmitUpdateModal = () => {
		dispatch(
			FETCH_UPDATE_RSU({
				query: { id: updateModalData.id },
				request: {
					name: updateModalData.name,
					recommended_speed: updateModalData.recommended_speed,
				},
			})
		)
			.then(refetchData)
			.then(() => {
				if (!createRSUError) {
					enqueueSnackbar('Update a RSU sucessfully', {
						variant: 'success',
					});
				} else {
					enqueueSnackbar('Fail to update a RSU', { variant: 'error' });
				}
			});
		handleCloseUpdateModal();
	};
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_RSU({ id: deleteModalData.id })).then(refetchData);
		handleCloseDeleteModal();
	};
	const refetchData = () => dispatch(FETCH_GET_RSUS());

	useEffect(() => {
		refetchData();
	}, []);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_RSU}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
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
				handleOnClose={handleCloseInformModal}
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
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
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
				handleOnClose={handleCloseDeleteModal}
				onSubmit={handleSubmitDeleteModal}
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
						<Filter template={RSUFilterTemplate} />
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_RSU}
								variant="contained"
								onClick={() => setOpenRegisterModal(true)}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
								onClick={refetchData}
							/>
						</Stack>
						<TableCV2X<RSUsProps>
							columns={RSUsTableTemplate}
							rows={
								rsus?.map((rsu) => {
									return {
										id: rsu.id,
										name: rsu.name,
										recommended_speed: rsu.recommended_speed,
									};
								}) || []
							}
							handleOnClickInformation={(informData: RSUsProps) => {
								setInformModalData(informData);
								setOpenInformModal(true);
							}}
							handleOnClickUpdate={(updateData: RSUsProps) => {
								setUpdateModalData(updateData);
								setOpenUpdateModal(true);
							}}
							handleOnClickDelete={(deleteData: RSUsProps) => {
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
