'use client'

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';

import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api'
import { useState } from 'react';

export default function Home() {
	const [location, setLocation] = useState<google.maps.LatLngLiteral>({ lat: 13.746428639832523, lng: 100.53466506712641 })
	const [theFocusCar, setTheFocusCar] = useState<String>("Car")
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
	})

	function moveLocation() {
		setLocation({lat: location.lat, lng: location.lng + 0.01})
	}

	function focusCar(numberNode: Number) {
		setTheFocusCar("Car " + numberNode)
	}

	if(!isLoaded) return <div>Loading...</div>
	return (
		<>
			<PageTitle title={NAVBAR_LABEL.OVERVIEW} />
			<button onClick={moveLocation} className={"rounded-lg px-4 bg-error_red"}>move</button>
			<div className='flex'>
				<GoogleMap options={{ disableDefaultUI : true }} zoom={10} center={location} mapContainerClassName="w-[65%] h-[300px]">
					<Marker onClick={() => focusCar(1)} position={location}></Marker>
					<Circle center={location} radius={10000} options={{ fillColor: "blue", fillOpacity: 0.1,strokeColor: "blue" }} />
					<Marker onClick={() => focusCar(2)} position={{ lat:location.lat + 0.02, lng:location.lng }}></Marker>
				</GoogleMap>
				<span className='text-black'>Click: {theFocusCar}</span>
			</div>
		</>
	);
}
