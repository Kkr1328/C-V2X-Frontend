import { Circle, Marker } from "@react-google-maps/api";
import { ASSETS_PATH } from "@/constants/ROUTE";
import { MAP_OBJECT } from "@/constants/OVERVIEW";

interface RSUMarkerProps {
    location: google.maps.LatLngLiteral,
    radius: number | undefined,
    isFocus: boolean,
	onClick: () => void
}

export default function RSUMarker(props: RSUMarkerProps) {
    return (
        <>
            <Circle center={props.location} radius={props.radius} options={{ fillColor: "#17A5D3", fillOpacity: 0.1, strokeColor: "#17A5D3" }} />
            <Marker 
                icon={{
                    url: ASSETS_PATH.RSU_PIN,
                    scaledSize: props.isFocus ? 
                        new google.maps.Size(MAP_OBJECT.FOCUS_PIN_SIZE, MAP_OBJECT.FOCUS_PIN_SIZE) 
                        : new google.maps.Size(MAP_OBJECT.NORMAL_PIN_SIZE, MAP_OBJECT.NORMAL_PIN_SIZE)
                }}
                onClick={props.onClick} 
                position={props.location}
            />
        </>
    )
}