'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import ModalCV2X from '@/components/common/ModalCV2X';
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter';
import ModalInputs from '@/components/module/ModalInputs';
import TableCV2X from '@/components/module/TableCV2X';
import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { MockedRSUsTableContent } from '@/mock/ENTITY_TABLE';
import { RSUActionModalTemplate } from '@/templates/ACTION_MODAL';
import { RSUsTableTemplate } from '@/templates/ENTITY_TABLE';
import { RSUFilterTemplate } from '@/templates/FILTER';
import { RSUInfoModalTemplate } from '@/templates/INFO_MODAL';
import { RSUsProps } from '@/types/ENTITY';
import { Card, Divider, Stack } from '@mui/material';
import { useState } from 'react';

export default function Home() {
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
	const [updateModalData, setUpdateModalData] =
		useState<RSUsProps>(defaultData);
	const [deleteModalData, setDeleteModalData] =
		useState<RSUsProps>(defaultData);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_RSU}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={() => setOpenRegisterModal(false)}
			>
				<ModalInputs template={RSUActionModalTemplate} />
			</ModalCV2X>
			<ModalCV2X
				title={informModalData.name}
				variant={'Inform'}
				open={openInformModal}
				handleOnClose={() => setOpenInformModal(false)}
			>
				<ModalInputs
					template={RSUInfoModalTemplate}
					initiateValue={informModalData}
					isReadOnly={true}
				/>
			</ModalCV2X>
			<ModalCV2X
				title={MODAL_LABEL.UPDATE_RSU + updateModalData.id}
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={() => setOpenUpdateModal(false)}
			>
				<ModalInputs
					template={RSUActionModalTemplate}
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
							/>
						</Stack>
						<TableCV2X<RSUsProps>
							columns={RSUsTableTemplate}
							rows={MockedRSUsTableContent}
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
