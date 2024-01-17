'use client';
// next
import { useRouter } from 'next/navigation';
// tanstack
import { useQuery } from '@tanstack/react-query';
// react
import { Fragment, useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, Popper } from '@mui/material';
// components
import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import StatusDot from '@/components/common/StatusDot';
import TableContent from '@/components/module/Table/TableContent';
import Text from '@/components/common/Text';
import InfoModal from '@/components/module/Modal/InfoModal';
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
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
import { STATUS_DEFINITION } from '@/constants/DEFINITION';
// types
import { StatusDotType } from '@/types/COMMON';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';
import { ICar, ICarInfo } from '@/types/models/car.model';
import { IRSU } from '@/types/models/rsu.model';
// utilities
import { WidthObserver, WindowWidthObserver } from '@/utils/WidthObserver';
import IconMapper from '@/utils/IconMapper';
import { DefaultDataGenerator } from '@/utils/DataGenerator';
import { handleOpenModal } from '@/utils/ModalController';
// services
import { getCarsAPI, getRSUsAPI } from '@/services/api-call';

function StatusDefinition({
	status,
}: {
	status: 'Active' | 'Warning' | 'Emergency' | 'Inactive' | 'Missing';
}) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handlePopoverOpen = () => {
		setOpen(true);
	};

	const handlePopoverClose = () => {
		setOpen(false);
	};

	return (
		<div className="flex flex-row gap-4 items-center">
			<StatusDot variant={status} />
			<p>-</p>
			<p>{status}</p>
			<div
				ref={anchorRef}
				className="text-light_text_grey"
				style={{ display: 'inline-block' }}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				<IconMapper icon={BUTTON_LABEL.HELP} size="16px" />
			</div>
			<Popper
				placement="bottom-end"
				disablePortal={false}
				open={open}
				anchorEl={anchorRef.current}
				modifiers={[
					{
						name: 'flip',
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
				]}
				className="z-10"
			>
				<div className="flex flex-col max-w-[200px] border-[1px] border-dark_background_grey bg-light_background_grey rounded-sm items-center justify-items-start">
					<Text
						style="text-p2 text-black bg-light_background_grey w-full px-8 rounded-t-sm"
						content={status}
					/>
					<Divider />
					<Text
						style="text-p2 text-dark_text_grey bg-white w-full px-8 rounded-b-sm"
						content={STATUS_DEFINITION[status]}
					/>
				</div>
			</Popper>
		</div>
	);
}

export default function Home() {
	const router = useRouter();
	const cardRef = useRef<HTMLDivElement>(null);
	const [cardWidth, setCardWidth] = useState<number>(
		cardRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(cardRef.current, setCardWidth), []);
	const useCompactButton = cardWidth < 440;
	const useCompactContent = cardWidth < 740;

	const [windowWidth, setWindowWidth] = useState(1000);
	useEffect(() => WindowWidthObserver(setWindowWidth), []);
	const isUseCompactModal = windowWidth <= 640;

	const defaultCarInfoData = DefaultDataGenerator(
		CarInfoModalTemplate(isUseCompactModal)
	);
	const defaultRSUInfoData = DefaultDataGenerator(
		RSUInfoModalTemplate(isUseCompactModal)
	);

	const [informCarModalData, setInformCarModalData] =
		useState<ICarInfo>(defaultCarInfoData);
	const [informRSUModalData, setInformRSUModalData] =
		useState<IRSU>(defaultRSUInfoData);

	const [openInformCarModal, setOpenInformCarModal] = useState<boolean>(false);
	const [openInformRSUModal, setOpenInformRSUModal] = useState<boolean>(false);

	const handleOpenInformModal = (informData: ICar) => {
		const front_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Front')[0];
		const back_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Back')[0];
		const left_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Left')[0];
		const right_cam =
			informData.cameras.length !== 0 &&
			informData.cameras.filter((camera) => camera.position === 'Right')[0];
		setInformCarModalData({
			...informData,
			front_cam_position: front_cam ? front_cam.position : '',
			front_cam_name: front_cam ? front_cam.name : '',
			back_cam_position: back_cam ? back_cam.position : '',
			back_cam_name: back_cam ? back_cam.name : '',
			left_cam_position: left_cam ? left_cam.position : '',
			left_cam_name: left_cam ? left_cam.name : '',
			right_cam_position: right_cam ? right_cam.position : '',
			right_cam_name: right_cam ? right_cam.name : '',
		});
		setOpenInformCarModal(true);
	};

	const { isLoading: isCarsLoading, data: cars } = useQuery({
		queryKey: ['getCars'],
		queryFn: async () => await getCarsAPI({}),
	});

	const { isLoading: isRsusLoading, data: rsus } = useQuery({
		queryKey: ['getRSUs'],
		queryFn: async () => await getRSUsAPI({}),
	});

	const carsHeartbeat =
		!isCarsLoading &&
		cars.map((car: ICar): ICarHeartbeat => {
			return {
				...car,
				status: 'Inactive',
				front_cam: car.cameras.some((camera) => camera.position === 'Front')
					? 'Inactive'
					: 'Missing',
				back_cam: car.cameras.some((camera) => camera.position === 'Back')
					? 'Inactive'
					: 'Missing',
				left_cam: car.cameras.some((camera) => camera.position === 'Left')
					? 'Inactive'
					: 'Missing',
				right_cam: car.cameras.some((camera) => camera.position === 'Right')
					? 'Inactive'
					: 'Missing',
			};
		});

	const rsuHeartbeat =
		!isRsusLoading &&
		rsus.map((rsu: IRSU): IRSUHeartbeat => {
			return {
				...rsu,
				status: 'Inactive',
			};
		});

	return (
		<Fragment>
			<InfoModal
				title={informCarModalData.name}
				template={CarInfoModalTemplate(isUseCompactModal)}
				open={openInformCarModal}
				onOpenChange={setOpenInformCarModal}
				data={informCarModalData}
				onDataChange={setInformCarModalData}
				handleHeaderLocate={() =>
					router.push(`${ROUTE.OVERVIEW}?id=${informCarModalData.id}`)
				}
			/>
			<InfoModal
				title={informRSUModalData.name}
				template={RSUInfoModalTemplate(isUseCompactModal)}
				open={openInformRSUModal}
				onOpenChange={setOpenInformRSUModal}
				data={informRSUModalData}
				onDataChange={setInformRSUModalData}
				handleHeaderLocate={() =>
					router.push(`${ROUTE.OVERVIEW}?id=${informRSUModalData.id}`)
				}
			/>
			<div className="flex flex-col w-full h-auto gap-16">
				<PageTitle title={NAVBAR_LABEL.HEARTBEAT} />
				<Card
					ref={cardRef}
					className="flex flex-col gap-16 w-full min-w-[300px] h-auto rounded-lg px-32 py-24"
				>
					<div className="flex flex-col h-full gap-16">
						<div className="flex flex-wrap gap-16 items-center">
							{StatusDotType.map((status, index) => (
								<div key={index}>
									<StatusDefinition status={status} />
								</div>
							))}
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.REFRESH}
								label={useCompactButton ? '' : BUTTON_LABEL.REFRESH}
								variant="outlined"
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
									rows={carsHeartbeat}
									isLoading={isCarsLoading}
									handleOnClickLocation={(id) =>
										router.push(`${ROUTE.OVERVIEW}?id=${id}`)
									}
									handleOnClickInformation={handleOpenInformModal}
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
									rows={rsuHeartbeat}
									isLoading={isRsusLoading}
									handleOnClickLocation={(id) =>
										router.push(`${ROUTE.OVERVIEW}?id=${id}`)
									}
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
		</Fragment>
	);
}
