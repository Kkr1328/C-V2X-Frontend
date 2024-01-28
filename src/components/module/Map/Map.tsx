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

interface MapProps {
	focus: FocusState | null;
	resetFocus: () => void;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function Map(props: MapProps) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey:
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '<GOOGLE-MAP-KEY>',
	});

	// states
	const [map, setMap] = useState<google.maps.Map>();

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
		if (props.focus.location) {
			map?.panTo(props.focus.location);
		}
		if (props.focus.zoom) {
			map?.setZoom(props.focus.zoom);
		}
	}, [props.focus]);

	if (!isLoaded)
		return (
			<Skeleton
				animation="wave"
				variant="rectangular"
				className="rounded-md h-full min-h-[500px]"
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
				<CarPin
					key={id}
					id={id}
					isFocus={props.focus?.id === id}
					changeFocus={props.changeFocus}
				/>
			))}
			{rsusList?.map(({ id }) => (
				<RSUPin
					key={id}
					id={id}
					isFocus={props.focus?.id === id}
					changeFocus={props.changeFocus}
				/>
			))}
			<DrivingTestLocationBtn map={map} resetFocus={props.resetFocus} />
		</GoogleMap>
	);
}
