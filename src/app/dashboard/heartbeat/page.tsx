'use client';
// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid } from '@mui/material';
// components
import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import StatusDot from '@/components/common/StatusDot';
import TableCV2X from '@/components/module/Table/TableContent';
// templates
import {
	CarsHeartbeatTableTemplate,
	RSUsHeartbeatTableTemplate,
} from '@/templates/HEARTBEAT_TABLE';
// consts
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { StatusDotType } from '@/types/COMMON';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';

import {
	MockedCarsHeartbeatTableContent,
	MockedRSUsHeartbeatTableContent,
} from '@/mock/HEARTBEAT_TABLE';

export default function Home() {
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
							<div className="flex flex-row" key={index}>
								<StatusDot variant={status} />
								<p>&nbsp;-&nbsp;{status}</p>
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
							/>
						</Grid>
					</Grid>
				</div>
			</Card>
		</div>
	);
}
