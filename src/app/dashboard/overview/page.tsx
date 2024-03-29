'use client';
// react
import { useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid } from '@mui/material';
// next
import { useSearchParams } from 'next/navigation';
// components
import PageTitle from '@/components/common/PageTitle';
import Map from '@/components/module/Map/Map';
import SummaryCards from '@/components/module/Overview/SummaryCards';
import FleetDeviceCards from '@/components/module/Overview/FleetDeviceCards';
// const
import { NAVBAR_LABEL } from '@/constants/LABEL';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import {
	useCarLocation,
	useCarStatus,
	useRSULocation,
	useRSUStatus,
} from '@/utils/FleetRetriever';

export default function Home() {
	// handle page responsive
	const pageRef = useRef<HTMLDivElement>(null);
	const [pageWidth, setPageWidth] = useState<number>(
		pageRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(pageRef.current, setPageWidth), []);
	const useCompactSummaries = pageWidth < 500;
	const useMediumSummaries = pageWidth < 1000;
	const summariesXs = useCompactSummaries ? 4 : useMediumSummaries ? 2 : 1;
	const useCompactContent = pageWidth < 1000;

	// check initial focus on a device
	const searchParams = useSearchParams();
	const id = searchParams.get('id') ?? '';
	const carLoc = useCarLocation(id) as google.maps.LatLngLiteral;
	const carStat = useCarStatus(id);
	const rsuLoc = useRSULocation(id) as google.maps.LatLngLiteral;
	const rsuStat = useRSUStatus(id);

	const [focus, setFocus] = useState<FocusState | null>(null);
	const focusCarLoc = useCarLocation(
		focus?.type === 'CAR' ? focus?.id ?? '' : ''
	) as google.maps.LatLngLiteral;
	const focusRSULoc = useRSULocation(
		focus?.type === 'RSU' ? focus?.id ?? '' : ''
	) as google.maps.LatLngLiteral;

	useEffect(() => {
		if (!id) return;

		if (carLoc) {
			changeFocus({
				id: id,
				type: 'CAR',
				location: carLoc,
				status: carStat,
			});
		}
		if (rsuLoc) {
			changeFocus({
				id: id,
				type: 'RSU',
				location: rsuLoc,
				status: rsuStat,
			});
		}
	}, [id]);

	useEffect(() => {
		if (!focus) return;
		const location = (
			focus.type === 'CAR' ? focusCarLoc : focusRSULoc
		) as google.maps.LatLngLiteral;
		setFocus({ ...focus, location, zoom: focus.zoom });
	}, []);

	function changeFocus(node: StuffLocation | null) {
		if (node === null || node.id === focus?.id) {
			setFocus(null);
		} else {
			setFocus({
				id: node.id,
				type: node.type,
				location: node.location,
				zoom: null,
			});
		}
	}

	return (
		<div
			ref={pageRef}
			className="flex flex-col w-full min-w-[400px] h-auto gap-16"
		>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<div className="flex flex-col min-h-[calc(100vh-192px)] gap-16">
				<SummaryCards summariesXs={summariesXs} />
				<Card
					className={`flex ${
						useCompactContent ? 'flex-col' : 'flex-row'
					} gap-8 w-full h-full rounded-lg px-24 py-24`}
				>
					<Map focus={focus} changeFocus={changeFocus} />
					{!useCompactContent && (
						<Grid item xs={1} className="flex items-center justify-center">
							<Divider orientation="vertical" />
						</Grid>
					)}
					<div className={`${!useCompactContent && 'min-w-[400px]'}`}>
						<FleetDeviceCards focus={focus} changeFocus={changeFocus} />
					</div>
				</Card>
			</div>
		</div>
	);
}
