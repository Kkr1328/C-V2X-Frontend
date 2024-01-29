// react
import { Marker } from '@react-google-maps/api';
// const
import { MAP_ASSETS } from '@/constants/ASSETS';
import { MAP_OBJECT_CONFIG } from '@/constants/OVERVIEW';
import { STATUS } from '@/constants/LABEL';
// types
import { StuffLocation } from '@/types/OVERVIEW';
// utilities
import { useCarLocation, useCarStatus } from '@/utils/FleetRetriever';

interface CarPinProps {
	id: string;
	isFocus: boolean;
	changeFocus: (node: StuffLocation | null) => void;
}

export default function CarPin(props: CarPinProps) {
	const id = props.id;
	const location = useCarLocation(id) as google.maps.LatLngLiteral;
	const status = useCarStatus(id);

	if (!location || !status || status === STATUS.INACTIVE) return;

	return (
		<Marker
			icon={{
				url: `${MAP_ASSETS.CAR_PIN}${status}.svg`,
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
					type: 'CAR',
					location,
					status,
				})
			}
			position={location}
		/>
	);
}
