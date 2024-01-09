'use client'

import PageTitle from '@/components/common/PageTitle';
import SummaryCard from '@/components/common/SummaryCard';
import ToggleButtonCV2X from '@/components/common/ToggleButtonCV2X';
import CarCard from '@/components/overview/CarCard';
import RSUMarker from '@/components/overview/RSUMarker';

import { NAVBAR_LABEL, OVERVIEW_SUMMARY_CARD_LABEL as SUMMARY_LABEL, PILL_LABEL } from '@/constants/LABEL';
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
import { MockedRSU } from '@/mock/ENTITY_OVERVIEW';
import { FLEET_CAR_LOCATION, FLEET_CAR_SPEED, FLEET_HEARTBEAT, FLEET_OBJECT, FocusState, StuffLocation } from '@/types/OVERVIEW';

import { Card, Divider, List } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react';
import RSUCard from '@/components/overview/RSUCard';
import { useQuery } from '@tanstack/react-query';
import { getCarsListAPI, getEmergencyListAPI } from '@/services/api-call';
import { IEmergency } from '@/types/models/emergency.model';
import { IResponseList } from '@/types/common/responseList.model';
import { io } from 'socket.io-client';

export default function Home() {
	const [focus, setFocus] = useState<FocusState>({
		id: "",
		type: 'CAR',
		location: MAP_OBJECT_CONFIG.INITIAL_MAP_CENTER
	})
	const focusRef = useRef(focus);
	focusRef.current = focus;

	const [map, setMap] = useState<google.maps.Map>()
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL)

	const [carListData, setCarListData] = useState<FLEET_OBJECT>({})

	const {
		isLoading: carsListLoading,
		data: fetchCarsList
	} = useQuery({
		queryKey: ['getCarList'],
		queryFn: async () => await getCarsListAPI()
	});

	useEffect(() => {
		const socket = io(process.env.NEXT_PUBLIC_FLEET_WEB_SOCKET_URL ?? "<SOCKET-URL>");
		socket.on('connect', () => {
			console.log('overview:connected websocket');
		})

		socket.on('heartbeat', (message) => {
			const heartbeat: FLEET_HEARTBEAT = JSON.parse(message);
			if (heartbeat.type === 'CAR') {
				setCarListData((prev) => ({
					...prev,
					[heartbeat.id]: {
						...prev[heartbeat.id],
						status: heartbeat.data.status,
					}
				}))
			} else if (heartbeat.type === 'RSU') {
				// TODO: update RSU heartbeat
			}
		})

		socket.on('location', (message) => {
			const car_location: FLEET_CAR_LOCATION = JSON.parse(message);
			setCarListData((prev) => ({
				...prev,
				[car_location.id]: {
					...prev[car_location.id],
					location: {
						lat: car_location.latitude,
						lng: car_location.longitude
					}
				}
			}))
			if (focusRef.current.id === car_location.id && focusRef.current.type === 'CAR') {
				setFocus((prev) => ({
					...prev,
					location: {
						lat: car_location.latitude,
						lng: car_location.longitude
					}
				}))
			}
		})

		socket.on('car_speed', (message) => {
			const car_speed: FLEET_CAR_SPEED = JSON.parse(message);
			console.log(car_speed)
			if (!carListData[car_speed.id]) { return }
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

	const { isLoading: isEmergencyListLoading, data: dataGetEmergencyList } =
		useQuery({
			queryKey: ['getEmergencyList'],
			queryFn: async () => await getEmergencyListAPI(),
		});

	const { isLoaded: isMapLoadFinish } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	useEffect(() => {
		map?.panTo(focus.location)
	}, [focus])

	function changeFocus(node: StuffLocation) {
		const { id, type, location, status } = node
		if (id === focus.id && type === focus.type) {
			setFocus({ ...focus, id: '', type: 'CAR' })
			setPillMode(PILL_LABEL.ALL)
		} else {
			setFocus({ id, type, location })
			setPillMode(status === PILL_LABEL.ACTIVE ? PILL_LABEL.ALL : node.status ?? PILL_LABEL.ALL)
		}
	}

	function changePillMode(value: PILL_LABEL) {
		setFocus({ id: focus.id, type: 'CAR', location: focus.location })
		if (value !== null) { setPillMode(value) }
	}

	function clickOnCarCard(id: string) {
		const { location, status } = carListData[id]
		changeFocus({ id, type: 'CAR', location, status })
	}

	return (
		<>
			<div className='mb-16'><PageTitle title={NAVBAR_LABEL.OVERVIEW} /></div>
			<div className='flex gap-32'>
				<SummaryCard
					title={SUMMARY_LABEL.ACTIVE_CAR}
					value={`${Object.entries(carListData).filter(([_id, car]) => car.status === PILL_LABEL.ACTIVE).length} / ${fetchCarsList?.length ?? '-'}`}
					isLoading={carsListLoading}
				/>
				<SummaryCard title={SUMMARY_LABEL.ACTIVE_DRIVER} value={'- / -'} />
				<SummaryCard
					title={SUMMARY_LABEL.IN_PROGRESS_EMERGENCY}
					value={(dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "inProgress"))?.length ?? "-"}
					isLoading={isEmergencyListLoading}
				/>
				<SummaryCard
					title={SUMMARY_LABEL.PENDING_EMERGENCY}
					value={(dataGetEmergencyList?.filter((emergency: IEmergency) => emergency.status === "pending"))?.length ?? "-"}
					isLoading={isEmergencyListLoading}
				/>
			</div>
			<Card className='flex w-full h-[60%] my-32 rounded-lg px-32 py-24'>
				{isMapLoadFinish &&
					<GoogleMap
						options={{ disableDefaultUI: true }}
						zoom={14}
						center={MAP_OBJECT_CONFIG.INITIAL_MAP_CENTER}
						mapContainerClassName="w-[70%]"
						onLoad={map => setMap(map)}
					>
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
							MockedRSU.map((RSU) =>
								<RSUMarker
									location={RSU.location}
									isFocus={focus.id === RSU.id}
									onClick={() => changeFocus(RSU)}
									key={RSU.id}
								/>
							)
						}
					</GoogleMap>
				}
				<Divider className='border mx-24' orientation='vertical' />
				<div className='flex flex-col w-[30%]'>
					<ToggleButtonCV2X
						options={[PILL_LABEL.ALL, PILL_LABEL.EMERGENCY, PILL_LABEL.WARNING]}
						value={pillMode ?? ""}
						onChange={(_event, value) => changePillMode(value)}
					/>
					<List className='grow overflow-y-scroll'>
						{focus.type === "CAR" || focus === null ?
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
							MockedRSU
								.filter(RSU => RSU.id === focus.id)
								.map((RSU) =>
									<RSUCard
										key={RSU.id}
										name={RSU.name}
										recommendSpeed={RSU.recommendSpeed}
										connectedCar={RSU.connectedCar}
									/>
								)
						}
					</List>
				</div>
			</Card>
		</>
	);
}
