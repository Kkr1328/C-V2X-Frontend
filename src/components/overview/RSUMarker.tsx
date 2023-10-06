import { Circle, Marker } from "@react-google-maps/api";

interface RSUMarkerProps {
    location: google.maps.LatLngLiteral,
    radius: number | undefined,
	onClick: () => void
}

export default function RSUMarker(props: RSUMarkerProps) {
    return (
        <>
            <Circle center={props.location} radius={props.radius} options={{ fillColor: "#17A5D3", fillOpacity: 0.1, strokeColor: "#17A5D3" }} />
            <Marker onClick={props.onClick} position={props.location}></Marker>
        </>
    )
}