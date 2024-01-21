import {
	FLEET_CAR_SPEED,
	FLEET_HEARTBEAT,
	FLEET_LOCATION,
} from '@/types/FLEET';
import { Dispatch, SetStateAction, createContext } from 'react';

const HeartbeatFleetContext = createContext<
	[
		{
			CAR: { [id: string]: FLEET_HEARTBEAT };
			RSU: { [id: string]: FLEET_HEARTBEAT };
		} | null,
		Dispatch<
			SetStateAction<{
				CAR: { [id: string]: FLEET_HEARTBEAT };
				RSU: { [id: string]: FLEET_HEARTBEAT };
			} | null>
		>
	]
>([null, () => {}]);

const LocationFleetContext = createContext<
	[
		{
			CAR: { [id: string]: FLEET_LOCATION };
			RSU: { [id: string]: FLEET_LOCATION };
		} | null,
		Dispatch<
			SetStateAction<{
				CAR: { [id: string]: FLEET_LOCATION };
				RSU: { [id: string]: FLEET_LOCATION };
			} | null>
		>
	]
>([null, () => {}]);

const CarSpeedFleetContext = createContext<
	[
		{ [id: string]: FLEET_CAR_SPEED } | null,
		Dispatch<SetStateAction<{ [id: string]: FLEET_CAR_SPEED } | null>>
	]
>([null, () => {}]);

export { HeartbeatFleetContext, LocationFleetContext, CarSpeedFleetContext };
