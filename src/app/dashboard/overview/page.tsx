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
import { FocusState, StuffLocation } from '@/types/OVERVIEW';

import { Card, Divider, List } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react';
import RSUCard from '@/components/overview/RSUCard';

export default function Home() {
	const [focus, setFocus] = useState<FocusState | null>(null)
	const [map, setMap] = useState<google.maps.Map>()
	const [pillMode, setPillMode] = useState<PILL_LABEL | null>(PILL_LABEL.ALL)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	function changeFocus(node: StuffLocation | null) {
		if (node === null || node.id === focus?.id) {
			setFocus(null)
			setPillMode(PILL_LABEL.ALL)
		} else {
			setFocus({ id: node.id, type: node.type })
			setPillMode(node.status === PILL_LABEL.ACTIVE ? PILL_LABEL.ALL : node.status ?? PILL_LABEL.ALL)
			map?.panTo(node.location)
		}
	}

	function changePillMode(value: PILL_LABEL) {
		setFocus({ id: focus?.id ?? "", type: 'CAR'})
		if (value !== null) { setPillMode(value) }
	}
	
	function clickOnCarCard(carID: string) {
		let target = MockedCarLocation.find((value) => value.id === carID) ?? null
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
									scaledSize: focus?.id === CAR.id ? 
										new google.maps.Size(MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE, MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE) : 
										new google.maps.Size(MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE, MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE)
								}}
								onClick={() => changeFocus(CAR)}
								position={CAR.location}
								key={CAR.id}
							/>
						)
					}
					{
						MockedRSU.map((RSU) => 
							<RSUMarker
								location={RSU.location}
								radius={RSU.radius}
								isFocus={focus?.id === RSU.id}
								onClick={() => changeFocus(RSU)}
								key={RSU.id}
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
						{ focus?.type === "CAR" || focus === null ?
							MockedCars
								.filter((car) => car.status === pillMode || pillMode === PILL_LABEL.ALL)
								.sort((car) => (car.id === focus?.id ? -1 : 1))
								.map((car) =>
									<CarCard
										key={car.id}
										car={car} 
										isFocus={car.id === focus?.id}
										onClick={() => clickOnCarCard(car.id)}							
									/>
								)
							:
							MockedRSU
								.filter(all => all.id === focus?.id)
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
