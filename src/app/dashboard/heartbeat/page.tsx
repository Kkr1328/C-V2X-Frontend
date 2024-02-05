'use client';
// next
import { useRouter } from 'next/navigation';
// tanstack
import { useQuery } from '@tanstack/react-query';
// react
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid } from '@mui/material';
// components
import Button from '@/components/common/Button';
import PageTitle from '@/components/common/PageTitle';
import StatusDot from '@/components/common/StatusDot';
import TableContent from '@/components/module/Table/TableContent';
import Text from '@/components/common/Text';
import InfoModal from '@/components/module/Modal/InfoModal';
import Popper from '@/components/common/Popper';
// templates
import {
	CarsHeartbeatTableTemplate,
	RSUsHeartbeatTableTemplate,
} from '@/templates/HEARTBEAT_TABLE';
import {
	CarInfoModalTemplate,
	RSUInfoModalTemplate,
} from '@/templates/INFO_MODAL';
// consts
import { BUTTON_LABEL, NAVBAR_LABEL, STATUS } from '@/constants/LABEL';
import { STATUS_DEFINITION } from '@/constants/DEFINITION';
// types
import { ICarInfo } from '@/types/models/car.model';
import { IRSU } from '@/types/models/rsu.model';
// utilities
import { WidthObserver, WindowWidthObserver } from '@/utils/WidthObserver';
import {
	CarDataTransformer,
	DefaultDataGenerator,
} from '@/utils/DataGenerator';
import { handleOpenModal } from '@/utils/ModalController';
import {
	useCarStatus,
	useCarsHeartbeat,
	useHandleCarLocate,
	useHandleRSULocate,
	useRSUStatus,
	useRSUsHeartbeat,
} from '@/utils/FleetRetriever';
// services
import { getCarsAPI, getRSUsAPI } from '@/services/api-call';
// contexts
import { HeartbeatFleetContext } from '@/context/FleetContext';

export default function Home() {
	const router = useRouter();
	const [_, setHeartbeatContextData] = useContext(HeartbeatFleetContext);

	// handle responsive layout
	const cardRef = useRef<HTMLDivElement>(null);
	const [cardWidth, setCardWidth] = useState<number>(
		cardRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(cardRef.current, setCardWidth), []);
	const useCompactButton = cardWidth < 440;
	const useCompactContent = cardWidth < 740;

	// handle responsive modal
	const [windowWidth, setWindowWidth] = useState(1000);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	// generate default data
	const defaultCarInfoData = DefaultDataGenerator(CarInfoModalTemplate);
	const defaultRSUInfoData = DefaultDataGenerator(RSUInfoModalTemplate);

	// Open-Close modal state
	const [openInformCarModal, setOpenInformCarModal] = useState<boolean>(false);
	const [openInformRSUModal, setOpenInformRSUModal] = useState<boolean>(false);
	// Modal data state
	const [informCarModalData, setInformCarModalData] =
		useState<ICarInfo>(defaultCarInfoData);
	const [informRSUModalData, setInformRSUModalData] =
		useState<IRSU>(defaultRSUInfoData);

	// query
	const {
		isLoading: isCarsLoading,
		data: cars,
		refetch: refetchCars,
	} = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});
	const {
		isLoading: isRsusLoading,
		data: rsus,
		refetch: refetchRSUs,
	} = useQuery({
		queryKey: ['getRSUs'],
		queryFn: async () => await getRSUsAPI({}),
	});

	const handleRefresh = () => {
		setHeartbeatContextData({ CAR: {}, CAMERA: {}, RSU: {} });
		refetchCars();
		refetchRSUs();
	};

	return (
		<>
			<InfoModal
				title={informCarModalData.name}
				template={CarInfoModalTemplate}
				open={openInformCarModal}
				onOpenChange={setOpenInformCarModal}
				data={informCarModalData}
				onDataChange={setInformCarModalData}
				isHeaderLocate
				handleHeaderLocate={useHandleCarLocate(router, informCarModalData.id)}
				headerPill={useCarStatus(informCarModalData.id)}
				isCompact={isUseCompactModal}
			/>
			<InfoModal
				title={informRSUModalData.name}
				template={RSUInfoModalTemplate}
				open={openInformRSUModal}
				onOpenChange={setOpenInformRSUModal}
				data={informRSUModalData}
				onDataChange={setInformRSUModalData}
				isHeaderLocate
				handleHeaderLocate={useHandleRSULocate(router, informRSUModalData.id)}
				headerPill={useRSUStatus(informRSUModalData.id)}
				isCompact={isUseCompactModal}
			/>
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.HEARTBEAT} />
				<Card
					ref={cardRef}
					className="flex flex-col gap-16 w-full min-w-[400px] h-auto rounded-lg px-32 py-24"
				>
					<div className="flex flex-col h-full gap-16">
						<div className="flex flex-wrap gap-16 items-center">
							{[
								STATUS.ACTIVE,
								STATUS.WARNING,
								STATUS.EMERGENCY,
								STATUS.INACTIVE,
								STATUS.MISSING,
							].map((status, index) => (
								<div key={index} className="flex flex-row gap-4 items-baseline">
									<StatusDot variant={status} />
									<Text content="-" />
									<Text content={status} />
									<Popper title={status} content={STATUS_DEFINITION[status]} />
								</div>
							))}
							<div className="grow" />
							<Button
								icon={BUTTON_LABEL.REFRESH}
								label={useCompactButton ? '' : BUTTON_LABEL.REFRESH}
								variant="outlined"
								onClick={handleRefresh}
							/>
						</div>
						<Divider />
						<Grid
							container
							columns={{ xs: 81 }}
							rowSpacing={1}
							columnSpacing={1}
						>
							<Grid item xs={useCompactContent ? 81 : 56}>
								<TableContent
									columns={CarsHeartbeatTableTemplate}
									rows={useCarsHeartbeat(cars ?? [])}
									isLoading={isCarsLoading}
									handleOnClickInformation={(data) =>
										handleOpenModal(
											CarDataTransformer(data),
											setOpenInformCarModal,
											setInformCarModalData
										)
									}
								/>
							</Grid>
							{!useCompactContent && (
								<Grid item xs={1} className="flex items-center justify-center">
									<Divider orientation="vertical" />
								</Grid>
							)}
							<Grid item xs={useCompactContent ? 81 : 24}>
								<TableContent
									columns={RSUsHeartbeatTableTemplate}
									rows={useRSUsHeartbeat(rsus ?? [])}
									isLoading={isRsusLoading}
									handleOnClickInformation={(data: IRSU) =>
										handleOpenModal(
											data,
											setOpenInformRSUModal,
											setInformRSUModalData
										)
									}
								/>
							</Grid>
						</Grid>
					</div>
				</Card>
			</div>
		</>
	);
}
