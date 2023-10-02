'use client';

import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import PageTitle from '@/components/common/PageTitle';
import { Card, Divider, Stack } from '@mui/material';
import Filter from '@/components/module/Filter';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import ModalCV2X from '@/components/common/ModalCV2X';
import ModalInputs from '@/components/module/ModalInputs';
import { useState } from 'react';
import TableCV2X from '@/components/module/TableCV2X';
import { CarsTableTemplate } from '@/templates/ENTITY_TABLE';
import { MockedCarsTableContent } from '@/mock/ENTITY_TABLE';
import { CarFilterTemplate } from '@/templates/FILTER';
import { CarActionModalTemplate } from '@/templates/ACTION_MODAL';
import { CarsProps } from '@/types/ENTITY';
import { CarInfoModalTemplate } from '@/templates/INFO_MODAL';

export default function Home() {
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

	const [informModalData, setInformModalData] =
		useState<CarsProps>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<CarsProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<CarsProps>(defaultData);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAR}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={() => setOpenRegisterModal(false)}
			>
				<ModalInputs template={CarActionModalTemplate} />
			</ModalCV2X>
			<ModalCV2X
				title={informModalData.name}
				variant={'Inform'}
				open={openInformModal}
				handleOnClose={() => setOpenInformModal(false)}
			>
				<ModalInputs
					template={CarInfoModalTemplate}
					initiateValue={informModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_CAR + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={() => setOpenUpdateModal(false)}
			>
				<ModalInputs
					template={CarActionModalTemplate}
					initiateValue={updateModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.ARE_YOU_SURE}
				variant={BUTTON_LABEL.DELETE}
				open={openDeleteModal}
				handleOnClose={() => setOpenDeleteModal(false)}
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
						<Filter template={CarFilterTemplate} />
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_CAR}
								variant="contained"
								onClick={() => setOpenRegisterModal(true)}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
							/>
						</Stack>
						<TableCV2X<CarsProps>
							columns={CarsTableTemplate}
							rows={MockedCarsTableContent}
							handleOnClickInformation={(informData: CarsProps) => {
								setInformModalData(informData);
								setOpenInformModal(true);
							}}
							handleOnClickUpdate={(updateData: CarsProps) => {
								setUpdateModalData(updateData);
								setOpenUpdateModal(true);
							}}
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
