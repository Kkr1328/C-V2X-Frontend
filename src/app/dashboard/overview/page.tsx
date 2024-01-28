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
// const
import { NAVBAR_LABEL, STATUS } from '@/constants/LABEL';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
// context
import { HeartbeatFleetContext, LocationFleetContext } from '@/context/fleet';
import SummaryCards from '@/components/module/Overview/SummaryCards';
import FleetDeviceCards from '@/components/module/Overview/FleetDeviceCards';
import { carLocation, carStatus } from '@/utils/FleetRetriever';

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
	const id = searchParams.get('id');
	useEffect(() => {
		if (id) {
			clickOnCarCard(id);
		}
	}, [id]);

	// retrieve fleet contexts
	const [locationContextData] = useContext(LocationFleetContext);

	const [focus, setFocus] = useState<FocusState | null>(null);
	const resetFocus = () => setFocus(null);

	useEffect(() => {
		if (!focus) return;
		let location = null;
		if (focus.type === 'CAR') {
			const car_location = locationContextData.CAR[focus.id];
			if (car_location === undefined) return;
			location = {
				lat: car_location.latitude,
				lng: car_location.longitude,
			};
		} else if (focus.type === 'RSU') {
			const rsu_location = locationContextData.RSU[focus.id];
			if (rsu_location === undefined) return;
			location = {
				lat: rsu_location.latitude,
				lng: rsu_location.longitude,
			};
		}
		setFocus({ ...focus, location, zoom: focus.zoom });
	}, [locationContextData]);

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

	function clickOnCarCard(carID: string) {
		const location = carLocation(carID) as google.maps.LatLngLiteral;
		const status = carStatus(carID);
		changeFocus({
			id: carID,
			type: 'CAR',
			location: location,
			status: status,
		});
	}

	return (
		<div
			ref={pageRef}
			className="flex flex-col w-full min-w-[300px] h-auto gap-16"
		>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<SummaryCards summariesXs={summariesXs} />
			<Card className="flex w-full h-auto rounded-lg px-24 py-24">
				<Grid
					container
					columns={{ xs: 81 }}
					rowSpacing={1}
					columnSpacing={{ xs: 1 }}
				>
					<Grid item xs={useCompactContent ? 81 : 56}>
						<Map
							focus={focus}
							resetFocus={resetFocus}
							changeFocus={changeFocus}
						/>
					</Grid>
					{!useCompactContent && (
						<Grid item xs={1} className="flex items-center justify-center">
							<Divider orientation="vertical" />
						</Grid>
					)}
					<Grid item xs={useCompactContent ? 81 : 24}>
						<FleetDeviceCards
							focus={focus}
							pillMode={pillMode}
							changePillMode={changePillMode}
							clickOnCarCard={clickOnCarCard}
						/>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
