'use client';
// next
import { useRouter } from 'next/navigation';
// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, Popper } from '@mui/material';
// components
import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import StatusDot from '@/components/common/StatusDot';
import TableCV2X from '@/components/module/Table/TableContent';
import Text from '@/components/common/Text';
// templates
import {
	CarsHeartbeatTableTemplate,
	RSUsHeartbeatTableTemplate,
} from '@/templates/HEARTBEAT_TABLE';
// consts
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
// types
import { StatusDotType } from '@/types/COMMON';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import IconMapper from '@/utils/IconMapper';

import {
	MockedCarsHeartbeatTableContent,
	MockedRSUsHeartbeatTableContent,
} from '@/mock/HEARTBEAT_TABLE';

const statusDefinition = {
	Active: 'The device is online.',
	Warning: 'The device may have a issue.',
	Emergency: 'The device has a problem.',
	Inactive: 'The device is offline.',
	Missing: 'The device does not exist.',
};

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
			>
				<div className="flex flex-col border-[1px] border-dark_background_grey bg-light_background_grey rounded-sm items-center justify-items-start">
					<Text
						style="text-p2 text-black bg-light_background_grey w-full px-8 rounded-t-sm"
						content={status}
					/>
					<Divider />
					<Text
						style="text-p2 text-dark_text_grey bg-white w-full px-8 rounded-b-sm"
						content={statusDefinition[status]}
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

	return (
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
					<Grid container columns={{ xs: 65 }} rowSpacing={1} columnSpacing={1}>
						<Grid item xs={useCompactContent ? 65 : 40}>
							<TableCV2X<ICarHeartbeat>
								columns={CarsHeartbeatTableTemplate}
								rows={MockedCarsHeartbeatTableContent}
								handleOnClickLocation={() =>
									router.push(`${ROUTE.OVERVIEW}?car_id=${'carxxx01'}`)
								}
							/>
						</Grid>
						{!useCompactContent && (
							<Grid item xs={1} className="flex items-center justify-center">
								<Divider orientation="vertical" />
							</Grid>
						)}
						<Grid item xs={useCompactContent ? 65 : 24}>
							<TableCV2X<IRSUHeartbeat>
								columns={RSUsHeartbeatTableTemplate}
								rows={MockedRSUsHeartbeatTableContent}
								handleOnClickLocation={() =>
									router.push(`${ROUTE.OVERVIEW}?car_id=${'carxxx01'}`)
								}
							/>
						</Grid>
					</Grid>
				</div>
			</Card>
		</div>
	);
}
