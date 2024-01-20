'use client';
// react
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { FLEET_CAR, FLEET_CAR_LOCATION, FLEET_CAR_SPEED, FLEET_HEARTBEAT, FLEET_RSU, FocusState, StuffLocation } from '@/types/OVERVIEW';
// utilities
import { WidthObserver } from '@/utils/WidthObserver';
import { useQuery } from '@tanstack/react-query';
import { getCarsListAPI, getEmergencyListAPI, getRSUsListAPI } from '@/services/api-call';
import { IEmergency } from '@/types/models/emergency.model';
import { io } from 'socket.io-client';
import { IResponseList } from '@/types/common/responseList.model';
import DrivingTestLocationBtn from '@/components/common/DrivingTestLocationBtn';

export default function Home() {
	const searchParams = useSearchParams();
	const id = searchParams.get('id');
	useEffect(() => {
		if (id) {
			clickOnCarCard(id);
		}
	}, [id]);

	const pageRef = useRef<HTMLDivElement>(null);
	const [pageWidth, setPageWidth] = useState<number>(
		pageRef.current?.clientWidth as number
	);
	useEffect(() => WidthObserver(pageRef.current, setPageWidth), []);
	const useCompactSummaries = pageWidth < 500;
	const useMediumSummaries = pageWidth < 1000;
	const summariesXs = useCompactSummaries ? 4 : useMediumSummaries ? 2 : 1;
	const useCompactContent = pageWidth < 1000;

	const [focus, setFocus] = useState<FocusState>({
		id: "",
		type: 'CAR',
		location: MAP_OBJECT_CONFIG.INITIAL_MAP_CENTER,
		zoom: null
	})
	const focusRef = useRef(focus);
	focusRef.current = focus;

	const [map, setMap] = useState<google.maps.Map>()
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL)

	const [carListData, setCarListData] = useState<FLEET_CAR>({})
	const [rsuListData, setRSUListData] = useState<FLEET_RSU>({})

	const activeCar = useMemo(() => Object.entries(carListData).filter(([_id, car]) => [PILL_LABEL.ACTIVE, PILL_LABEL.EMERGENCY, PILL_LABEL.WARNING].includes(car.status)).length, [carListData])
	const activeRSU = useMemo(() => Object.entries(rsuListData).filter(([_id, rsu]) => [PILL_LABEL.ACTIVE, PILL_LABEL.INACTIVE].includes(rsu.status)).length, [rsuListData])

	const {
		isLoading: carsListLoading,
		data: fetchCarsList
	} = useQuery({
		queryKey: ['getCarList'],
		queryFn: async () => await getCarsListAPI()
	});

	const {
		isLoading: rsuListLoading,
		data: fetchRSUsList
	} = useQuery({
		queryKey: ['fleet:getRSUsList'],
		queryFn: async () => await getRSUsListAPI()
	});

	const { isLoading: isEmergencyListLoading, data: dataGetEmergencyList } =
		useQuery({
			queryKey: ['getEmergencyList'],
			queryFn: async () => await getEmergencyListAPI(),
		});
	const pendingEmergency = useRef(dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "pending"));
	pendingEmergency.current = useMemo(() => dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "pending"), [dataGetEmergencyList]);
	const inProgressEmergency = useMemo(() => (dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "inProgress")), [dataGetEmergencyList])

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? "<SOCKET-URL>", { transports: ['websocket', 'polling'] });
		socket.on('connect', () => {
			console.log('overview:connected websocket');
		})

		socket.on('heartbeat', (heartbeat: FLEET_HEARTBEAT) => {
			if (heartbeat.type === 'CAR') {
				setCarListData((prev) => ({
					...prev,
					[heartbeat.id]: {
						...prev[heartbeat.id],
						status: pendingEmergency.current?.find((task: IEmergency) => task.car_id === heartbeat.id) ? PILL_LABEL.EMERGENCY : heartbeat.data.status,
					}
				}))
			} else if (heartbeat.type === 'RSU') {
				setRSUListData((prev) => ({
					...prev,
					[heartbeat.id]: {
						...prev[heartbeat.id],
						status: heartbeat.data.status,
						connected_OBU: heartbeat.data.connected_OBU,
					}
				}))
			}
		})

		socket.on('location', (location: FLEET_CAR_LOCATION) => {
			if (location.type === 'CAR') {
				setCarListData((prev) => ({
					...prev,
					[location.id]: {
						...prev[location.id],
						location: {
							lat: location.latitude,
							lng: location.longitude
						}
					}
				}))
			} else if (location.type === 'RSU') {
				setRSUListData((prev) => ({
					...prev,
					[location.id]: {
						...prev[location.id],
						location: {
							lat: location.latitude,
							lng: location.longitude
						}
					}
				}))
			}
			if (focusRef.current.id === location.id && focusRef.current.type === location.type) {
				setFocus((prev) => ({
					...prev,
					location: {
						lat: location.latitude,
						lng: location.longitude
					}
				}))
			}
		})

		socket.on('car_speed', (car_speed: FLEET_CAR_SPEED) => {
			setCarListData((prev) => ({
				...prev,
				[car_speed.id]: {
					...prev[car_speed.id],
					speed: {
						velocity: car_speed.velocity,
						unit: car_speed.unit
					},
				}
			}))
		})

		return () => {
			socket.disconnect();
			console.log('overview:disconnected websocket');
		}
	}, [])

	useEffect(() => {
		if (!fetchCarsList) return
		fetchCarsList.forEach((element: IResponseList) => {
			setCarListData((prev) => ({
				...prev,
				[element.id]: {
					...prev[element.id],
					name: element.name,
					status: PILL_LABEL.INACTIVE,
				}
			}))
		})
	}, [fetchCarsList])

	useEffect(() => {
		if (!fetchRSUsList) return
		fetchRSUsList.forEach((element: IResponseList) => {
			setRSUListData((prev) => ({
				...prev,
				[element.id]: {
					...prev[element.id],
					name: element.name
				}
			}))
		})
	}, [fetchRSUsList])

	const { isLoaded: isMapLoadFinish } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	useEffect(() => {
		map?.panTo(focus.location)
		if (focus.zoom) {
			map?.setZoom(focus.zoom)
		}
	}, [focus])

	function changeFocus(node: StuffLocation) {
		const { id, type, location, status } = node
		if (id === focus.id && type === focus.type) {
			setFocus({ ...focus, id: '', type: 'CAR', zoom: null })
			setPillMode(PILL_LABEL.ALL)
		} else {
			setFocus({ id, type, location, zoom: null })
			setPillMode(status === PILL_LABEL.ACTIVE ? PILL_LABEL.ALL : node.status ?? PILL_LABEL.ALL)
		}
	}

	function changePillMode(value: PILL_LABEL) {
		setFocus({ id: focus.id, type: 'CAR', location: focus.location, zoom: null })
		if (value !== null) { setPillMode(value) }
	}

	function clickOnCarCard(id: string) {
		const { location, status } = carListData[id]
		changeFocus({ id, type: 'CAR', location, status })
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
					<SummaryCard
						title={SUMMARY_LABEL.ACTIVE_CAR}
						value={`${activeCar ?? '-'} / ${fetchCarsList?.length ?? '-'}`}
						isLoading={carsListLoading}
					/>
				</Grid>
				<Grid item xs={summariesXs}>
					<SummaryCard
						title={SUMMARY_LABEL.ACTIVE_RSU}
						value={`${activeRSU ?? '-'} / ${fetchRSUsList?.length ?? '-'}`}
						isLoading={rsuListLoading}
					/>
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
						{!isMapLoadFinish ? (
							<Skeleton
								animation="wave"
								variant="rectangular"
								className="rounded-md h-full"
							/>
						) : (
							<GoogleMap
								zoom={14}
								center={MAP_OBJECT_CONFIG.INITIAL_MAP_CENTER}
								mapContainerClassName="h-full min-h-[500px] w-full rounded-md"
								onLoad={map => setMap(map)}
								options={{
									mapTypeControlOptions: {
										position: google.maps.ControlPosition.TOP_RIGHT
									},
									keyboardShortcuts: false,
									zoomControl: false,
									streetViewControl: false,
									fullscreenControl: false
								}}
							>
								<DrivingTestLocationBtn setFocus={setFocus} />
								{
									Object.entries(carListData).map(([id, car]) =>
										<Marker
											icon={{
												url: `${MAP_ASSETS.CAR_PIN}${car.status}.svg`,
												scaledSize: focus.id === id ?
													new google.maps.Size(MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE, MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE) :
													new google.maps.Size(MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE, MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE)
											}}
											onClick={() => changeFocus({ id, type: 'CAR', location: car.location, status: car.status } as StuffLocation)}
											position={car.location}
											key={id}
										/>
									)
								}
								{
									Object.entries(rsuListData).map(([id, RSU]) =>
										<RSUMarker
											location={RSU.location}
											isFocus={focus.id === id}
											onClick={() => changeFocus({ id, type: 'RSU', location: RSU.location } as StuffLocation)}
											key={id}
										/>
									)
								}
							</GoogleMap>
						)}
					</Grid>
					{!useCompactContent && (
						<Grid item xs={1} className="flex items-center justify-center">
							<Divider orientation="vertical" />
						</Grid>
					)}
					<Grid item xs={useCompactContent ? 81 : 24}>
						<div className='flex flex-col w-full gap-16'>
							<ToggleButtonCV2X
								options={[PILL_LABEL.ALL, PILL_LABEL.EMERGENCY, PILL_LABEL.WARNING]}
								value={pillMode ?? ''}
								onChange={(_event, value) => changePillMode(value)}
							/>
							<div className="flex flex-col w-full min-w-max h-full gap-16 pb-8 overflow-y-auto">
								{focus.type === "CAR" ?
									<>
										{
											Object.entries(carListData)
												.filter(([_id, car]) => car.status && (car.status === pillMode || pillMode === PILL_LABEL.ALL) && car.status !== PILL_LABEL.INACTIVE)
												.map(([id, car]) =>
													<CarCard
														key={id}
														car={{
															id,
															name: car.name,
															status: car.status,
															speed: `${car.speed?.velocity.toString() ?? 'loading...'} ${car.speed?.unit.toString() ?? ''}`,
														}}
														isFocus={id === focus.id}
														onClick={() => clickOnCarCard(id)}
													/>
												)
										}
									</>
									:
									<RSUCard
										id={focus.id}
										connectedCar={
											rsuListData[focus.id].connected_OBU?.map((id) => ({
												name: carListData[id].name,
												status: carListData[id].status,
												speed: `${carListData[id].speed?.velocity.toString() ?? 'loading...'} ${carListData[id].speed?.unit ?? ''}`
											}))
										}
									/>
								}
							</div>
						</div>
					</Grid>
				</Grid>
			</Card>
		</div >
	);
}
