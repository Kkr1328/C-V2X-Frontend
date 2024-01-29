import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
	HeartbeatFleetContext,
	CarSpeedFleetContext,
	LocationFleetContext,
} from '@/context/fleet';
import {
	FLEET_CAR_SPEED,
	FLEET_HEARTBEAT,
	FLEET_LOCATION,
} from '@/types/FLEET';
import { STATUS } from '@/constants/LABEL';

export default function FleetWrapper(props: { children: React.ReactNode }) {
	const [heartbeatData, setHeartbeatData] = useState<{
		CAR: { [id: string]: FLEET_HEARTBEAT };
		RSU: { [id: string]: FLEET_HEARTBEAT };
	}>({ CAR: {}, RSU: {} });
	const [carSpeedData, setCarSpeedData] = useState<{
		[id: string]: FLEET_CAR_SPEED | undefined;
	}>({});
	const [locationData, setLocationData] = useState<{
		CAR: { [id: string]: FLEET_LOCATION };
		RSU: { [id: string]: FLEET_LOCATION };
	}>({ CAR: {}, RSU: {} });

	useEffect(() => {
		const socket = io(
			process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? '<SOCKET-URL>',
			{ transports: ['websocket', 'polling'] }
		);
		socket.on('connect', () => {
			console.log('connected: fleeting websocket');
		});

		const carHeartbeatTimers: { [id: string]: NodeJS.Timeout } = {};
		const rsuHeartbeatTimers: { [id: string]: NodeJS.Timeout } = {};
		const carLocationTimers: { [id: string]: NodeJS.Timeout } = {};
		const rsuLocationTimers: { [id: string]: NodeJS.Timeout } = {};
		const carSpeedTimers: { [id: string]: NodeJS.Timeout } = {};

		const setInactive = (id: string, type: 'CAR' | 'RSU', dataType: string) => {
			if (dataType === 'heartbeat') {
				setHeartbeatData((prevData) => ({
					...prevData,
					[type]: {
						...prevData[type],
						[id]: {
							...prevData[type][id],
							data: {
								...prevData[type][id].data,
								status: STATUS.INACTIVE,
							},
						},
					},
				}));
			} else if (dataType === 'location') {
				setLocationData((prev) => ({
					...prev,
					[type]: {
						...prev[type],
						[id]: undefined,
					},
				}));
			} else if (dataType === 'speed') {
				setCarSpeedData((prev) => ({
					...prev,
					[id]: undefined,
				}));
			}
		};

		const handleTimeout = (
			id: string,
			type: 'CAR' | 'RSU',
			dataType: string
		) => {
			const timers =
				dataType === 'location'
					? type === 'CAR'
						? carLocationTimers
						: rsuLocationTimers
					: dataType === 'heartbeat'
					? type === 'CAR'
						? carHeartbeatTimers
						: rsuHeartbeatTimers
					: carSpeedTimers;
			timers[id] = setTimeout(() => {
				setInactive(id, type, dataType);
			}, 10000);
		};

		socket.on('heartbeat', (heartbeat: FLEET_HEARTBEAT) => {
			const { id, type } = heartbeat;
			setHeartbeatData((prev) => ({
				...prev,
				[type]: {
					...prev[type],
					[id]: heartbeat,
				},
			}));
			clearTimeout(
				type === 'CAR' ? carHeartbeatTimers[id] : rsuHeartbeatTimers[id]
			);
			handleTimeout(id, type, 'heartbeat');
		});

		socket.on('location', (location: FLEET_LOCATION) => {
			const { id, type } = location;
			setLocationData((prev) => ({
				...prev,
				[type]: {
					...prev[type],
					[id]: location,
				},
			}));
			clearTimeout(
				type === 'CAR' ? carLocationTimers[id] : rsuLocationTimers[id]
			);
			handleTimeout(id, type, 'location');
		});

		socket.on('car_speed', (car_speed: FLEET_CAR_SPEED) => {
			const { id } = car_speed;
			setCarSpeedData((prev) => ({
				...prev,
				[id]: car_speed,
			}));
			clearTimeout(carSpeedTimers[id]);
			handleTimeout(id, 'CAR', 'speed');
		});

		Object.entries(heartbeatData).forEach(([type, data]) => {
			Object.keys(data).forEach((id) => {
				handleTimeout(id, type as 'CAR' | 'RSU', 'heartbeat');
			});
		});

		return () => {
			socket.disconnect();
			console.log('disconnected: fleeting websocket');

			// Clear all heartbeat timers
			Object.values(carHeartbeatTimers).forEach((timer) => clearTimeout(timer));
			Object.values(rsuHeartbeatTimers).forEach((timer) => clearTimeout(timer));
			Object.values(carLocationTimers).forEach((timer) => clearTimeout(timer));
			Object.values(rsuLocationTimers).forEach((timer) => clearTimeout(timer));
			Object.values(carSpeedTimers).forEach((timer) => clearTimeout(timer));
		};
	}, []);

	return (
		<HeartbeatFleetContext.Provider value={[heartbeatData, setHeartbeatData]}>
			<LocationFleetContext.Provider value={[locationData, setLocationData]}>
				<CarSpeedFleetContext.Provider value={[carSpeedData, setCarSpeedData]}>
					{props.children}
				</CarSpeedFleetContext.Provider>
			</LocationFleetContext.Provider>
		</HeartbeatFleetContext.Provider>
	);
}
