'use client';
// react
import { useContext, useEffect, useRef, useState } from 'react';
// material ui
import { Card, Divider, Grid, Skeleton } from '@mui/material';
// google map
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// next
import { useSearchParams } from 'next/navigation';
// components
import PageTitle from '@/components/common/PageTitle';
import SummaryCard from '@/components/common/SummaryCard';
import ToggleButtonCV2X from '@/components/common/ToggleButtonCV2X';
import CarCard from '@/components/common/CarCard';
import RSUMarker from '@/components/common/RSUMarker';
import RSUCard from '@/components/common/RSUCard';
// const
import {
	NAVBAR_LABEL,
	OVERVIEW_SUMMARY_CARD_LABEL as SUMMARY_LABEL,
	PILL_LABEL,
} from '@/constants/LABEL';
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
// context
import { CarSpeedFleetContext, HeartbeatFleetContext, LocationFleetContext } from '@/context/fleet';
// mock
import {
	MockedCars,
	MockedCarLocation,
	MockedRSU,
} from '@/mock/ENTITY_OVERVIEW';
import { useQuery } from '@tanstack/react-query';
import { getCarsListAPI, getRSUsListAPI } from '@/services/api-call';

export default function Home() {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		if (id) {
			clickOnCarCard(id);
		}
	}, [id]);

	const [heartbeatContextData] = useContext(HeartbeatFleetContext)
	const [locationContextData] = useContext(LocationFleetContext)
	const [carSpeedContextData] = useContext(CarSpeedFleetContext)

	const { data: carsList } = useQuery<{ id: string, name: string }[]>({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI()
	});

	const { data: rsusList } = useQuery<{ id: string, name: string }[]>({
		queryKey: ['getRSUsList'],
		queryFn: async () => await getRSUsListAPI()
	});

	const [focus, setFocus] = useState<FocusState | null>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL);

	const pageRef = useRef<HTMLDivElement>(null);
	const [pageWidth, setPageWidth] = useState<number>(
		pageRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(pageRef.current, setPageWidth), []);
	const useCompactSummaries = pageWidth < 500;
	const useMediumSummaries = pageWidth < 1000;
	const summariesXs = useCompactSummaries ? 4 : useMediumSummaries ? 2 : 1;
	const useCompactContent = pageWidth < 1000;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey:
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '<GOOGLE-MAP-KEY>',
	});

	function changeFocus(node: StuffLocation | null) {
		if (node === null || node.id === focus?.id) {
			setFocus(null);
			setPillMode(PILL_LABEL.ALL);
		} else {
			setFocus({ id: node.id, type: node.type });
			setPillMode(
				node.status === PILL_LABEL.ACTIVE
					? PILL_LABEL.ALL
					: node.status ?? PILL_LABEL.ALL
			);
			map?.panTo(node.location);
		}
	}

	function changePillMode(value: PILL_LABEL) {
		setFocus({ id: focus?.id ?? '', type: 'CAR' });
		if (value !== null) {
			setPillMode(value);
		}
	}

	function clickOnCarCard(carID: string) {
		let target = MockedCarLocation.find((value) => value.id === carID) ?? null;
		changeFocus(target);
	}

	return (
		<div
			ref={pageRef}
			className="flex flex-col w-full min-w-[300px] h-auto gap-16"
		>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<Grid
				container
				columns={{ xs: 4 }}
				rowSpacing={2}
				columnSpacing={{ xs: 2 }}
			>
				<Grid item xs={summariesXs}>
					<SummaryCard title={SUMMARY_LABEL.ACTIVE_CAR} value={'4 / 5'} />
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard title={SUMMARY_LABEL.ACTIVE_DRIVER} value={'4 / 10'} />
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard
						title={SUMMARY_LABEL.IN_PROGRESS_EMERGENCY}
						value={'7'}
					/>
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard title={SUMMARY_LABEL.PENDING_EMERGENCY} value={'3'} />
				</Grid>
			</Grid>
			<Card className="flex w-full h-auto rounded-lg px-24 py-24">
				<Grid
					container
					columns={{ xs: 81 }}
					rowSpacing={1}
					columnSpacing={{ xs: 1 }}
				>
					<Grid item xs={useCompactContent ? 81 : 56}>
						{!isLoaded ? (
							<Skeleton
								animation="wave"
								variant="rectangular"
								className="rounded-md h-full"
							/>
						) : (
							<GoogleMap
								options={{ disableDefaultUI: true }}
								zoom={14}
								center={MockedCarLocation[0].location}
								mapContainerClassName="h-full min-h-[500px] w-full rounded-md"
								onLoad={(map) => setMap(map)}
							>
								{carsList?.map(({ id }) => {
									const status = heartbeatContextData.CAR[id]?.data.status ?? PILL_LABEL.INACTIVE;
									const location = {
										lat: locationContextData.CAR[id]?.latitude ?? 0,
										lng: locationContextData.CAR[id]?.longitude ?? 0
									}
									return (
										<Marker
											icon={{
												url: `${MAP_ASSETS.CAR_PIN}${status}.svg`,
												scaledSize:
													focus?.id === id
														? new google.maps.Size(
															MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE,
															MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE
														)
														: new google.maps.Size(
															MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE,
															MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE
														),
											}}
											onClick={() => changeFocus({
												id,
												type: 'CAR',
												location,
												status
											})}
											position={location}
											key={id}
										/>
									)
								})}
								{rsusList?.map(({ id }) => {
									const location = {
										lat: locationContextData.RSU[id]?.latitude ?? 0,
										lng: locationContextData.RSU[id]?.longitude ?? 0
									}
									return (
										<RSUMarker
											location={location}
											isFocus={focus?.id === id}
											onClick={() => changeFocus({
												id,
												type: 'RSU',
												location
											})}
											key={id}
										/>
									)
								})}
							</GoogleMap>
						)}
					</Grid>
					{!useCompactContent && (
						<Grid item xs={1} className="flex items-center justify-center">
							<Divider orientation="vertical" />
						</Grid>
					)}
					<Grid item xs={useCompactContent ? 81 : 24}>
						<div className="flex flex-col w-full gap-16">
							<ToggleButtonCV2X
								options={[
									PILL_LABEL.ALL,
									PILL_LABEL.EMERGENCY,
									PILL_LABEL.WARNING,
								]}
								value={pillMode ?? ''}
								onChange={(_event, value) => changePillMode(value)}
							/>
							<div className="flex flex-col w-full min-w-max h-full gap-16 pb-8 overflow-y-auto">
								{focus?.type === 'CAR' || focus === null
									? carsList?.filter(
										({ id }) => {
											const status = heartbeatContextData.CAR[id]?.data.status;
											return status && (status === pillMode || pillMode === PILL_LABEL.ALL) && status !== PILL_LABEL.INACTIVE
										}
									)
										.sort((car) => (car.id === focus?.id ? -1 : 1))
										.map((car) => (
											<CarCard
												key={car.id}
												car={{
													id: car.id,
													name: car.name,
													speed: carSpeedContextData[car.id]?.velocity.toString() + ' km/h' ?? 'null',
													status: heartbeatContextData.CAR[car.id]?.data.status ?? PILL_LABEL.INACTIVE,
												}}
												isFocus={car.id === focus?.id}
												onClick={() => clickOnCarCard(car.id)}
											/>
										))
									: rsusList?.filter((rsu) => rsu.id === focus?.id).map(
										(RSU) => (
											<RSUCard
												key={RSU.id}
												id={RSU.id}
												connectedCar={
													heartbeatContextData.RSU[RSU.id]?.data.connected_OBU.map((obu_id) => ({
														name: carsList?.find(({ id }) => id === obu_id)?.name ?? 'null',
														speed: carSpeedContextData[obu_id]?.velocity.toString() + ' km/h',
														status: heartbeatContextData.CAR[obu_id]?.data.status ?? PILL_LABEL.INACTIVE
													})) ?? []
												}
											/>
										)
									)}
							</div>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
