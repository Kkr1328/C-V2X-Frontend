'use client'

import PageTitle from '@/components/common/PageTitle';
import SummaryCard from '@/components/common/SummaryCard';
import ToggleButtonCV2X from '@/components/common/ToggleButtonCV2X';
import CarCardDetail from '@/components/overview/CarCardDetail';
import RSUMarker from '@/components/overview/RSUMarker';

import { NAVBAR_LABEL, OVERVIEW_SUMMARY_CARD_LABEL as SUMMARY_LABEL, PILL_LABEL } from '@/constants/LABEL';
import { MockedCars, MockedCarLocation, MockedRSU } from '@/mock/ENTITY_OVERVIEW';
import { CarLocation, RSUInformation } from '@/types/OVERVIEW';

import { Card, Divider, List } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react';

export default function Home() {
	const [theFocus, setTheFocus] = useState<String>()
	const [focusMode, setFocusMode] = useState<"RSU" | "CAR">("CAR")
	const [centerLoc, setCenterLoc] = useState(MockedCarLocation[0].location)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	function changeFocusCar(node: CarLocation) {
		setTheFocus(node.id)
		setFocusMode("CAR")
	}

	function changeFocusRSU(node: RSUInformation) {
		setTheFocus(node.id)
		setFocusMode("RSU")

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
					center={centerLoc} 
					mapContainerClassName="w-[70%]"
				>
					{
						MockedCarLocation.map((CAR) =>
							<Marker
								onClick={() => changeFocusCar(CAR)}
								position={CAR.location}
							/>
						)
					}
					{
						MockedRSU.map((RSU) => 
							<RSUMarker
								location={RSU.location}
								radius={RSU.radius}
								onClick={() => changeFocusRSU(RSU)}
							/>
						) 
					}
				</GoogleMap>
				<Divider className='border mx-24' orientation='vertical' />
				<div className='flex flex-col w-[30%] gap-8'>
					<ToggleButtonCV2X options={[PILL_LABEL.ALL, PILL_LABEL.EMERGENCY, PILL_LABEL.WARNING]} value={PILL_LABEL.ALL} onChange={() => {console.log()}} />
					<List className='grow overflow-y-scroll'>
						{ focusMode == "CAR" ?
							MockedCars.sort((car) => (car.id === theFocus ? -1 : 1)).map((car) =>
								<CarCardDetail 
									car={car} 
									isFocus={car.id === theFocus}									
								/>
							)
							:
							MockedRSU.filter(all => all.id === theFocus).map((RSU) =>
								<Card className='rounded-lg my-8 p-8'>
									<div className='text-[20px] font-bold'>{RSU.name}</div>
									<div>Recommended speed: {RSU.recommendSpeed}</div>
									<Divider />
								</Card>
							)
						}
					</List>
				</div>
			</Card>
		</>
	);
}
