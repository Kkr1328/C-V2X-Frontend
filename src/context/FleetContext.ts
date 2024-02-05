import {
	FLEET_CAR_SPEED,
	FLEET_HEARTBEAT,
	FLEET_LOCATION,
} from '@/types/FLEET';
import { Dispatch, SetStateAction, createContext } from 'react';

const HeartbeatFleetContext = createContext<
	[
		{
			CAR: { [id: string]: FLEET_HEARTBEAT | undefined };
			CAMERA: { [id: string]: FLEET_HEARTBEAT | undefined };
			RSU: { [id: string]: FLEET_HEARTBEAT | undefined };
		},
		Dispatch<
			SetStateAction<{
				CAR: { [id: string]: FLEET_HEARTBEAT };
				CAMERA: { [id: string]: FLEET_HEARTBEAT };
				RSU: { [id: string]: FLEET_HEARTBEAT };
			}>
		>
	]
>([{ CAR: {}, CAMERA: {}, RSU: {} }, () => {}]);

const LocationFleetContext = createContext<
	[
		{
			CAR: { [id: string]: FLEET_LOCATION | undefined };
			RSU: { [id: string]: FLEET_LOCATION | undefined };
		},
		Dispatch<
			SetStateAction<{
				CAR: { [id: string]: FLEET_LOCATION };
				RSU: { [id: string]: FLEET_LOCATION };
			}>
		>
	]
>([{ CAR: {}, RSU: {} }, () => {}]);

const CarSpeedFleetContext = createContext<
	[
		{ [id: string]: FLEET_CAR_SPEED | undefined },
		Dispatch<SetStateAction<{ [id: string]: FLEET_CAR_SPEED | undefined }>>
	]
>([{}, () => {}]);

export { HeartbeatFleetContext, LocationFleetContext, CarSpeedFleetContext };
