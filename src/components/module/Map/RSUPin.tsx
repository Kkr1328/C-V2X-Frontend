// react
import { Circle, Marker } from '@react-google-maps/api';
// const
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
import { rsuLocation, rsuStatus } from '@/utils/FleetRetriever';
import { STATUS } from '@/constants/LABEL';
// types
import { StuffLocation } from '@/types/OVERVIEW';

interface RSUPinProps {
	id: string;
	isFocus: boolean;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function RSUPin(props: RSUPinProps) {
	const id = props.id;
	const location = rsuLocation(id) as google.maps.LatLngLiteral;
	const status = rsuStatus(id);

	if (!location || !status || status === STATUS.INACTIVE) return;

	return (
		<>
			<Circle
				center={location}
				radius={0}
				options={{
					fillColor: MAP_OBJECT_CONFIG.COVER_AREA_COLOR,
					strokeColor: MAP_OBJECT_CONFIG.COVER_AREA_COLOR,
					fillOpacity: 0.1,
				}}
			/>
			<Marker
				icon={{
					url: MAP_ASSETS.RSU_PIN,
					scaledSize: props.isFocus
						? new google.maps.Size(
								MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE,
								MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE
						  )
						: new google.maps.Size(
								MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE,
								MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE
						  ),
				}}
				onClick={() =>
					props.changeFocus({
						id,
						type: 'RSU',
						location,
						status,
					})
				}
				position={location}
			/>
		</>
	);
}
