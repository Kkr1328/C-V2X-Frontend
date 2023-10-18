'use client'

import PageTitle from '@/components/common/PageTitle';
import SummaryCard from '@/components/common/SummaryCard';
import ToggleButtonCV2X from '@/components/common/ToggleButtonCV2X';
import CarCard from '@/components/overview/CarCard';
import RSUMarker from '@/components/overview/RSUMarker';

import { NAVBAR_LABEL, OVERVIEW_SUMMARY_CARD_LABEL as SUMMARY_LABEL, PILL_LABEL } from '@/constants/LABEL';
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
import { MockedCars, MockedCarLocation, MockedRSU } from '@/mock/ENTITY_OVERVIEW';
import { StuffLocation, RSUInformation } from '@/types/OVERVIEW';

import { Card, Divider, List } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react';
import RSUCard from '@/components/overview/RSUCard';

export default function Home() {
	const [theFocus, setTheFocus] = useState<String | null>()
	const [focusMode, setFocusMode] = useState<"RSU" | "CAR">("CAR")
	const [map, setMap] = useState<google.maps.Map>()
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	function changeFocus(node: StuffLocation | null) {
		if (node === null || node.id === theFocus) {
			setTheFocus(null)
			setPillMode(PILL_LABEL.ALL)
			map?.panTo(MockedCarLocation[0].location)
		} else {
			setTheFocus(node.id)
			setPillMode(
				node.status === PILL_LABEL.ACTIVE ? PILL_LABEL.ALL : 
				node.status ?? PILL_LABEL.ALL
			)
			map?.panTo(node.location)
		}
		setFocusMode("CAR")
	}

	function changeFocusRSU(node: RSUInformation) {
		if (theFocus === node.id) {
			changeFocus(null)
			return
		}
		setTheFocus(node.id)
		setFocusMode("RSU")
		setPillMode(null)
		map?.panTo(node.location)
	}

	function changePillMode(value: PILL_LABEL) {
		setFocusMode("CAR")
		if (value !== null) {
			setPillMode(value)
		}
	}
	
	function clickCarCard(carID: string) {
		let index = MockedCarLocation.findIndex((value) => value.id === carID)
		let target = MockedCarLocation[index]
		changeFocus(target)
	}

	if(!isLoaded) return <div>Loading...</div>
	return (
		<>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<div className='flex gap-32'>
				<SummaryCard title={SUMMARY_LABEL.ACTIVE_CAR} value={'4 / 5'} />
				<SummaryCard title={SUMMARY_LABEL.ACTIVE_DRIVER} value={'4 / 10'} />
				<SummaryCard title={SUMMARY_LABEL.IN_PROGRESS_EMERGENCY} value={'7'} />
				<SummaryCard title={SUMMARY_LABEL.PENDING_EMERGENCY} value={'3'} />
			</div>
			<Card className='flex w-full h-[60%] my-32 rounded-lg px-32 py-24'>
				<GoogleMap 
					options={{ disableDefaultUI : true }} 
					zoom={14} 
					center={MockedCarLocation[0].location}
					mapContainerClassName="w-[70%]"
					onLoad={ map => setMap(map) }
				>
					{
						MockedCarLocation.map((CAR) =>
							<Marker
								icon={{
									url: `${MAP_ASSETS.CAR_PIN}${CAR.status}.svg`,
									scaledSize: theFocus === CAR.id ? 
										new google.maps.Size(MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE, MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE) : 
										new google.maps.Size(MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE, MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE)
								}}
								onClick={() => changeFocus(CAR)}
								position={CAR.location}
							/>
						)
					}
					{
						MockedRSU.map((RSU) => 
							<RSUMarker
								location={RSU.location}
								radius={RSU.radius}
								isFocus={theFocus === RSU.id}
								onClick={() => changeFocusRSU(RSU)}
							/>
						) 
					}
				</GoogleMap>
				<Divider className='border mx-24' orientation='vertical' />
				<div className='flex flex-col w-[30%]'>
					<ToggleButtonCV2X 
						options={[PILL_LABEL.ALL, PILL_LABEL.EMERGENCY, PILL_LABEL.WARNING]} 
						value={pillMode ?? ""} 
						onChange={(_event, value) => changePillMode(value)}
					/>
					<List className='grow overflow-y-scroll'>
						{ focusMode === "CAR" ?
							MockedCars
								.filter((car) => car.status === pillMode || pillMode === PILL_LABEL.ALL)
								.sort((car) => (car.id === theFocus ? -1 : 1))
								.map((car) =>
									<CarCard
										key={car.id}
										car={car} 
										isFocus={car.id === theFocus}
										onClick={() => clickCarCard(car.id)}							
									/>
								)
							:
							MockedRSU
								.filter(all => all.id === theFocus)
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
