'use client';
// react
import { Fragment, useEffect, useState } from 'react';
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
import { DriversProps } from '@/types/ENTITY';
// templates
import { DriverFilterTemplate } from '@/templates/FILTER';
import { DriversTableTemplate } from '@/templates/ENTITY_TABLE';
import { DriverInfoModalTemplate } from '@/templates/INFO_MODAL';
import { DriverActionModalTemplate } from '@/templates/ACTION_MODAL';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import { selectGetDrivers } from '@/redux/get-drivers/get-drivers-selector';
import { FETCH_GET_DRIVERS } from '@/redux/get-drivers/get-drivers-action';
import { FETCH_CREATE_DRIVER } from '@/redux/create-driver/create-driver-action';
import { FETCH_UPDATE_DRIVER } from '@/redux/update-driver/update-driver-action';
import { FETCH_DELETE_DRIVER } from '@/redux/delete-driver/delete-driver-action';

export default function Home() {
	const dispatch = useDispatch();

	const { data: drivers } = useSelector(selectGetDrivers);

	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openInformModal, setOpenInformModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const defaultData = DriverActionModalTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as DriversProps[keyof DriversProps],
		}),
		{} as DriversProps
	);

	const [informModalData, setInformModalData] =
		useState<DriversProps>(defaultData);
	const [registerModalData, setRegisterModalData] =
		useState<DriversProps>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<DriversProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<DriversProps>(defaultData);

	const handleCloseInformModal = () => setOpenInformModal(false);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultData);
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
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
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
	const handleCloseDeleteModal = () => {
		setOpenDeleteModal(false);
		setDeleteModalData(defaultData);
	};
	const handleSubmitDeleteModal = () => {
		dispatch(FETCH_DELETE_DRIVER({ id: deleteModalData.id })).then(refetchData);
		handleCloseDeleteModal();
	};
	const refetchData = () => dispatch(FETCH_GET_DRIVERS());

	useEffect(() => {
		refetchData();
	}, []);

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
						<Filter template={DriverFilterTemplate} />
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_DRIVER}
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
						<TableCV2X<DriversProps>
							columns={DriversTableTemplate}
							rows={
								drivers?.map((driver) => {
									return {
										id: driver._id,
										name: driver.first_name + ' ' + driver.last_name,
										first_name: driver.first_name,
										last_name: driver.last_name,
										phone_no: driver.phone_no,
										username: driver.username,
									};
								}) || []
							}
							handleOnClickInformation={(informData: DriversProps) => {
								setInformModalData(informData);
								setOpenInformModal(true);
							}}
							handleOnClickUpdate={(updateData: DriversProps) => {
								setUpdateModalData(updateData);
								setOpenUpdateModal(true);
							}}
							handleOnClickDelete={(deleteData: DriversProps) => {
								setDeleteModalData(deleteData);
								setOpenDeleteModal(true);
							}}
							isLoading={true}
						/>
					</Stack>
				</Card>
			</Stack>
		</Fragment>
	);
}
