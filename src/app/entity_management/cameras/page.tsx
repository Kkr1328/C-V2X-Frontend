'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import ModalCV2X from '@/components/common/ModalCV2X';
import PageTitle from '@/components/common/PageTitle';
import Filter from '@/components/module/Filter';
import ModalInputs from '@/components/module/ModalInputs';
import TableCV2X from '@/components/module/TableCV2X';
import { BUTTON_LABEL, MODAL_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { MockedCamerasTableContent } from '@/mock/ENTITY_TABLE';
import { CameraActionModalTemplate } from '@/templates/ACTION_MODAL';
import { CamerasTableTemplate } from '@/templates/ENTITY_TABLE';
import { CameraFilterTemplate } from '@/templates/FILTER';
import { CamerasTableRowProps } from '@/types/ENTITY_TABLE';
import { CameraSearchRequest } from '@/types/SEARCH';
import { Card, Divider, Stack } from '@mui/material';
import { useState } from 'react';

export default function Home() {
	const [searchRequest, setSearchRequest] = useState<CameraSearchRequest>();
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);

	return (
		<>
			<ModalCV2X
				title={MODAL_LABEL.REGISTER_CAMERA}
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={() => setOpenRegisterModal(false)}
			>
				<ModalInputs template={CameraActionModalTemplate} />
			</ModalCV2X>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CAMERAS} />
				<Card className="w-full h-full rounded-lg px-32 py-24">
					<Stack className="gap-16">
						<Filter template={CameraFilterTemplate} />
						<Divider />
						<Stack direction="row" className="gap-8">
							<p className="inline-block align-baseline font-istok text-dark_text_grey text-h5 self-center">{`Total(10)`}</p>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REGISTER}
								label={BUTTON_LABEL.REGISTER_CAMERA}
								variant="contained"
								onClick={() => setOpenRegisterModal(true)}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={BUTTON_LABEL.REFRESH}
								variant="outlined"
							/>
						</Stack>
						<TableCV2X<CamerasTableRowProps>
							columns={CamerasTableTemplate}
							rows={MockedCamerasTableContent}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
