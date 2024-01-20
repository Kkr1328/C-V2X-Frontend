import { Circle, Marker } from "@react-google-maps/api";
import { MAP_ASSETS } from "@/constants/ASSETS";
import { MAP_OBJECT_CONFIG } from "@/constants/OVERVIEW";

interface RSUMarkerProps {
    location: google.maps.LatLngLiteral,
    radius?: number,
    isFocus: boolean,
    onClick: () => void
}

export default function RSUMarker(props: RSUMarkerProps) {
    return (
        <>
            <Circle
                center={props.location}
                radius={props.radius}
                options={{
                    fillColor: MAP_OBJECT_CONFIG.COVER_AREA_COLOR,
                    strokeColor: MAP_OBJECT_CONFIG.COVER_AREA_COLOR,
                    fillOpacity: 0.1,
                }}
            />
            <Marker
                icon={{
                    url: MAP_ASSETS.RSU_PIN,
                    scaledSize: props.isFocus ?
                        new google.maps.Size(MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE, MAP_OBJECT_CONFIG.FOCUS_PIN_SIZE)
                        : new google.maps.Size(MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE, MAP_OBJECT_CONFIG.NORMAL_PIN_SIZE)
                }}
                onClick={props.onClick}
                position={props.location}
            />
        </>
    )
}