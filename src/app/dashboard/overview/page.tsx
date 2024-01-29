'use client';
// react
import { useContext, useEffect, useRef, useState } from 'react';
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
import { NAVBAR_LABEL, STATUS } from '@/constants/LABEL';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import { carLocation, carStatus, rsuLocation } from '@/utils/FleetRetriever';

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
	const location = carLocation(id) as google.maps.LatLngLiteral;
	const status = carStatus(id);

	useEffect(() => {
		if (id) {
			changeFocus({
				id: id,
				type: 'CAR',
				location: location,
				status: status,
			});
		}
	}, [id]);

	const [focus, setFocus] = useState<FocusState | null>(null);
	const resetFocus = () => setFocus(null);

	useEffect(() => {
		if (!focus) return;
		const location = (
			focus.type === 'CAR' ? carLocation(focus.id) : rsuLocation(focus.id)
		) as google.maps.LatLngLiteral;
		setFocus({ ...focus, location, zoom: focus.zoom });
	}, []);

	const [pillMode, setPillMode] = useState<STATUS | null>(STATUS.ALL);

	function changeFocus(node: StuffLocation | null) {
		if (node === null || node.id === focus?.id) {
			setFocus(null);
			setPillMode(STATUS.ALL);
		} else {
			setFocus({
				id: node.id,
				type: node.type,
				location: node.location,
				zoom: null,
			});
			setPillMode(
				node.status === STATUS.ACTIVE ? STATUS.ALL : node.status ?? STATUS.ALL
			);
		}
	}

	function changePillMode(value: STATUS) {
		// case: focus is on RSU
		if (focus?.type === 'RSU') {
			setFocus({
				id: focus?.id ?? '',
				type: 'CAR',
				location: null,
				zoom: null,
			});
		}
		// case: same pill mode
		if (value !== null) {
			setPillMode(value);
		}
	}

	return (
		<div
			ref={pageRef}
			className="flex flex-col w-full min-w-[400px] h-auto gap-16"
		>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<SummaryCards summariesXs={summariesXs} />
			<Card
				className={`flex ${
					useCompactContent ? 'flex-col' : 'flex-row'
				} gap-8 w-full h-auto rounded-lg px-24 py-24`}
			>
				<Map focus={focus} resetFocus={resetFocus} changeFocus={changeFocus} />
				{!useCompactContent && (
					<Grid item xs={1} className="flex items-center justify-center">
						<Divider orientation="vertical" />
					</Grid>
				)}
				<div className={`${!useCompactContent && 'min-w-[400px]'}`}>
					<FleetDeviceCards
						focus={focus}
						pillMode={pillMode}
						changePillMode={changePillMode}
						changeFocus={changeFocus}
					/>
				</div>
			</Card>
		</div>
	);
}
