// react
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
// material ui
import Skeleton from '@mui/material/Skeleton';
// tanstack
import { useQuery } from '@tanstack/react-query';
// components
import DrivingTestLocationBtn from '@/components/module/Map/DrivingTestLocationBtn';
import CarPin from './CarPin';
import RSUPin from './RSUPin';
// const
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
// services
import { getCarsListAPI, getRSUsListAPI } from '@/services/api-call';
// types
import { FocusState, StuffLocation } from '@/types/OVERVIEW';
import { IResponseList } from '@/types/common/responseList.model';
import { useCarLocation, useRSULocation } from '@/utils/FleetRetriever';

interface MapProps {
	focus: FocusState | null;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function Map(props: MapProps) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey:
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '<GOOGLE-MAP-KEY>',
	});

	// states
	const [map, setMap] = useState<google.maps.Map>();
	const focusCarLoc = useCarLocation(
		props.focus?.type === 'CAR' ? props.focus?.id ?? '' : ''
	) as google.maps.LatLngLiteral;
	const focusRSULoc = useRSULocation(
		props.focus?.type === 'RSU' ? props.focus?.id ?? '' : ''
	) as google.maps.LatLngLiteral;

	// query
	const { data: carsList } = useQuery<IResponseList[]>({
		queryKey: ['getCarsList'],
		queryFn: async () => await getCarsListAPI(),
	});
	const { data: rsusList } = useQuery<IResponseList[]>({
		queryKey: ['getRSUsList'],
		queryFn: async () => await getRSUsListAPI(),
	});

	useEffect(() => {
		if (!props.focus) return;

		switch (props.focus.type) {
			case 'CAR':
				if (focusCarLoc) {
					map?.panTo(focusCarLoc);
				}
				break;
			case 'RSU':
				if (focusRSULoc) {
					map?.panTo(focusRSULoc);
				}
				break;
		}

		if (props.focus.zoom) {
			map?.setZoom(props.focus.zoom);
		}
	}, [props.focus, map, focusCarLoc, focusRSULoc]);

	const resetFocus = () => props.changeFocus(null);

	if (!isLoaded)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="rounded-md h-full min-h-[500px] w-full"
			/>
		);

	return (
		<GoogleMap
			options={{
				mapTypeControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT,
				},
				keyboardShortcuts: false,
				zoomControl: false,
				streetViewControl: false,
				fullscreenControl: false,
			}}
			zoom={14}
			center={MAP_OBJECT_CONFIG.DRIVING_TESTED_LOCATION.EXAT.location}
			mapContainerClassName="h-full min-h-[500px] w-full rounded-md"
			onLoad={(map) => setMap(map)}
		>
			{carsList?.map(({ id }) => (
				<CarPin {...props} key={id} id={id} isFocus={props.focus?.id === id} />
			))}
			{rsusList?.map(({ id }) => (
				<RSUPin {...props} key={id} id={id} isFocus={props.focus?.id === id} />
			))}
			<DrivingTestLocationBtn map={map} resetFocus={resetFocus} />
		</GoogleMap>
	);
}
