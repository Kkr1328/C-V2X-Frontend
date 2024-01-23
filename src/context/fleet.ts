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
		},
		Dispatch<
			SetStateAction<{
				CAR: { [id: string]: FLEET_HEARTBEAT };
				RSU: { [id: string]: FLEET_HEARTBEAT };
			}>
		>
	]
>([{ CAR: {}, RSU: {} }, () => {}]);

const LocationFleetContext = createContext<
	[
		{
			CAR: { [id: string]: FLEET_LOCATION };
			RSU: { [id: string]: FLEET_LOCATION };
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
		{ [id: string]: FLEET_CAR_SPEED },
		Dispatch<SetStateAction<{ [id: string]: FLEET_CAR_SPEED }>>
	]
>([{}, () => {}]);

export { HeartbeatFleetContext, LocationFleetContext, CarSpeedFleetContext };
