'use client';
// react
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import DrivingTestLocationBtn from '@/components/common/DrivingTestLocationBtn';
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
import { IEmergency } from '@/types/models/emergency.model';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import { useQuery } from '@tanstack/react-query';
import { getCarsListAPI, getRSUsListAPI } from '@/services/api-call';
import { getEmergencyListAPI } from '@/services/api-call';
// context
import { CarSpeedFleetContext, HeartbeatFleetContext, LocationFleetContext } from '@/context/fleet';

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
	const activeCar = useMemo(() =>
		Object.entries(heartbeatContextData.CAR).filter(([_key, value]) => {
			return value && (value.data.status !== PILL_LABEL.INACTIVE)
		}).length
		, [heartbeatContextData.CAR]);

	const { data: rsusList } = useQuery<{ id: string, name: string }[]>({
		queryKey: ['getRSUsList'],
		queryFn: async () => await getRSUsListAPI()
	});
	const activeRSU = useMemo(() =>
		Object.entries(heartbeatContextData.RSU).filter(([_key, value]) => {
			return value && (value.data.status === PILL_LABEL.ACTIVE)
		}).length
		, [heartbeatContextData.RSU]);

	const [focus, setFocus] = useState<FocusState | null>(null);
	useEffect(() => {
		if (!focus) return
		if (focus.location) {
			map?.panTo(focus.location)
		}
		if (focus.zoom) {
			map?.setZoom(focus.zoom)
		}
	}, [focus])

	useEffect(() => {
		if (!focus) return
		let location = null
		if (focus.type === 'CAR') {
			const car_location = locationContextData.CAR[focus.id]
			if (car_location === undefined) return
			location = {
				lat: car_location.latitude,
				lng: car_location.longitude
			}
		} else if (focus.type === 'RSU') {
			const rsu_location = locationContextData.RSU[focus.id]
			if (rsu_location === undefined) return
			location = {
				lat: rsu_location.latitude,
				lng: rsu_location.longitude
			}
		}
		setFocus({ ...focus, location, zoom: focus.zoom })
	}, [locationContextData])

	const [map, setMap] = useState<google.maps.Map>();
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL);

	const { isLoading: isEmergencyListLoading, data: dataGetEmergencyList } = useQuery({
		queryKey: ['getEmergencyList'],
		queryFn: async () => await getEmergencyListAPI(),
	});
	const pendingEmergency = useRef(dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "pending"));
	pendingEmergency.current = useMemo(() => dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "pending"), [dataGetEmergencyList]);
	const inProgressEmergency = useMemo(() => (dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "inProgress")), [dataGetEmergencyList])

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
			setFocus({ id: node.id, type: node.type, location: node.location, zoom: null });
			setPillMode(
				node.status === PILL_LABEL.ACTIVE
					? PILL_LABEL.ALL
					: node.status ?? PILL_LABEL.ALL
			);
		}
	}

	function changePillMode(value: PILL_LABEL) {
		// case: focus is on RSU
		if (focus?.type === 'RSU') {
			setFocus({ id: focus?.id ?? '', type: 'CAR', location: null, zoom: null });
		}
		// case: same pill mode
		if (value !== null) { setPillMode(value) }
	}

	function clickOnCarCard(carID: string) {
		const car_location = locationContextData.CAR[carID]
		if (car_location === undefined) return
		const location = {
			lat: car_location.latitude,
			lng: car_location.longitude
		}
		const status = heartbeatContextData.CAR[carID]?.data.status ?? PILL_LABEL.INACTIVE;
		changeFocus({
			id: carID,
			type: 'CAR',
			location: location,
			status: status
		});
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
					<SummaryCard title={SUMMARY_LABEL.ACTIVE_CAR} value={`${activeCar} / ${carsList?.length ?? '-'}`} />
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard title={SUMMARY_LABEL.ACTIVE_RSU} value={`${activeRSU} / ${rsusList?.length ?? '-'}`} />
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard
						title={SUMMARY_LABEL.IN_PROGRESS_EMERGENCY}
						value={inProgressEmergency?.length ?? "-"}
						isLoading={isEmergencyListLoading}
					/>
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard
						title={SUMMARY_LABEL.PENDING_EMERGENCY}
						value={pendingEmergency.current?.length ?? "-"}
						isLoading={isEmergencyListLoading}
					/>
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
								options={{
									mapTypeControlOptions: {
										position: google.maps.ControlPosition.TOP_RIGHT
									},
									keyboardShortcuts: false,
									zoomControl: false,
									streetViewControl: false,
									fullscreenControl: false
								}}
								zoom={14}
								center={MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.EXAT.location}
								mapContainerClassName="h-full min-h-[500px] w-full rounded-md"
								onLoad={(map) => setMap(map)}
							>
								<DrivingTestLocationBtn map={map} setFocus={setFocus} />
								{carsList?.filter(({ id }) => heartbeatContextData.CAR[id]?.data.status !== PILL_LABEL.INACTIVE)
									.map(({ id }) => {
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
								{rsusList?.filter(({ id }) => heartbeatContextData.RSU[id]?.data.status === PILL_LABEL.ACTIVE)
									.map(({ id }) => {
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
								{focus === null || focus.type === 'CAR'
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
