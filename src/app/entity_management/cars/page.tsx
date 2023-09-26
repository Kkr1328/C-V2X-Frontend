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
import { CarsTableRowProps } from '@/types/ENTITY_TABLE';
import { CarsTableTemplate } from '@/templates/ENTITY_TABLE';
import { MockedCarsTableContent } from '@/mock/ENTITY_TABLE';
import { CarFilterTemplate } from '@/templates/FILTER';
import { CarActionModalTemplate } from '@/templates/ACTION_MODAL';

export default function Home() {
	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);

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
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.CARS} />
				<Card className="w-full h-full rounded-lg px-32 py-24">
					<Stack className="gap-16">
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
						<TableCV2X<CarsTableRowProps>
							columns={CarsTableTemplate}
							rows={MockedCarsTableContent}
						/>
					</Stack>
				</Card>
			</Stack>
		</>
	);
}
