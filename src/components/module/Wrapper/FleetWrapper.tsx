import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
	HeartbeatFleetContext,
	CarSpeedFleetContext,
	LocationFleetContext,
} from '@/context/FleetContext';
import {
	FLEET_CAR_SPEED,
	FLEET_HEARTBEAT,
	FLEET_LOCATION,
} from '@/types/FLEET';
import { STATUS } from '@/constants/LABEL';
import RTCMultiConnection from 'rtcmulticonnection';
import { useQuery } from '@tanstack/react-query';
import { getCamerasAPI } from '@/services/api-call';
import { ICar } from '@/types/models/car.model';
import { CameraType } from '@/types/ENTITY';
import { convertFleetStatusToFormat } from '@/utils/StringFormat';
import { IResponseList } from '@/types/common/responseList.model';
import { RTCConnectionContext } from '@/context/RTCConnectionContext';
import { ICamera } from '@/types/models/camera.model';
import { generateRTCConnection } from '@/utils/RTCConnectionGenerator';

export default function FleetWrapper(props: { children: React.ReactNode }) {
	// query
	const { data: cameras } = useQuery({
		queryKey: ['getCameras'],
		queryFn: async () => await getCamerasAPI({}),
	});

	// states
	const [heartbeatData, setHeartbeatData] = useState<{
		CAR: { [id: string]: FLEET_HEARTBEAT };
		CAMERA: { [id: string]: FLEET_HEARTBEAT };
		RSU: { [id: string]: FLEET_HEARTBEAT };
	}>({ CAR: {}, CAMERA: {}, RSU: {} });
	const [carSpeedData, setCarSpeedData] = useState<{
		[id: string]: FLEET_CAR_SPEED | undefined;
	}>({});
	const [locationData, setLocationData] = useState<{
		CAR: { [id: string]: FLEET_LOCATION };
		RSU: { [id: string]: FLEET_LOCATION };
	}>({ CAR: {}, RSU: {} });
	const [rtcConnection, setRTCConnection] = useState<{
		[id: string]: RTCMultiConnection;
	}>({});

	// timers
	const carHeartbeatTimers: { [id: string]: NodeJS.Timeout } = {};
	const rsuHeartbeatTimers: { [id: string]: NodeJS.Timeout } = {};
	const carLocationTimers: { [id: string]: NodeJS.Timeout } = {};
	const rsuLocationTimers: { [id: string]: NodeJS.Timeout } = {};
	const carSpeedTimers: { [id: string]: NodeJS.Timeout } = {};

	const setInactive = (
		id: string,
		type: 'CAR' | 'CAMERA' | 'RSU',
		dataType: string
	) => {
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
			if (type !== 'CAMERA') {
				setLocationData((prev) => ({
					...prev,
					[type]: {
						...prev[type],
						[id]: undefined,
					},
				}));
			}
		} else if (dataType === 'speed') {
			setCarSpeedData((prev) => ({
				...prev,
				[id]: undefined,
			}));
		}
	};

	const handleTimeout = (
		id: string,
		type: 'CAR' | 'CAMERA' | 'RSU',
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
		}, 5000);
	};

	useEffect(() => {
		// socket connection
		const socket = io(
			process.env.NEXT_PUBLIC_WEB_SOCKET_URL ?? '<SOCKET-URL>',
			{
				transports: ['websocket', 'polling'],
			}
		);
		socket.on('connect', () => {
			console.log('connected: fleeting websocket');
		});

		// on receive heartbeat
		socket.on('heartbeat', (heartbeat: FLEET_HEARTBEAT) => {
			const { id, type } = heartbeat;
			setHeartbeatData((prev) => ({
				...prev,
				[type]: {
					...prev[type],
					[id]: {
						...prev[type][id],
						data: {
							...prev[type][id]?.data,
							status: convertFleetStatusToFormat(heartbeat.data.status),
							connected_OBU: heartbeat.data.connected_OBU ?? [],
						},
					},
				},
			}));
			clearTimeout(
				type === 'CAR' ? carHeartbeatTimers[id] : rsuHeartbeatTimers[id]
			);
			handleTimeout(id, type, 'heartbeat');
		});

		// on receive location
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

		// on receive car speed
		socket.on('car_speed', (car_speed: FLEET_CAR_SPEED) => {
			const { id } = car_speed;
			setCarSpeedData((prev) => ({
				...prev,
				[id]: car_speed,
			}));
			clearTimeout(carSpeedTimers[id]);
			handleTimeout(id, 'CAR', 'speed');
		});
	}, []);

	useEffect(() => {
		if (cameras) {
			setRTCConnection((prevState) => {
				const newState = { ...prevState };
				cameras.forEach((camera: ICamera) => {
					newState[camera.id] = generateRTCConnection();
					newState[`${camera.id}_modal`] = generateRTCConnection();
				});
				return newState;
			});
		}
	}, [cameras]);

	useEffect(() => {
		// emit pull camera heartbeat
		const intervalId = setInterval(() => {
			if (cameras && rtcConnection) {
				cameras.forEach((camera: ICamera) => {
					const connection = rtcConnection[camera.id];
					if (connection) {
						connection.checkPresence(
							`Room${camera.car_id}${camera.id}`,
							(isRoomExist) => {
								setHeartbeatData((prevData) => ({
									...prevData,
									CAMERA: {
										...prevData.CAMERA,
										[camera.id]: {
											...prevData.CAMERA[camera.id],
											data: {
												...prevData.CAMERA[camera.id]?.data,
												status: isRoomExist ? STATUS.ACTIVE : STATUS.INACTIVE,
											},
										},
									},
								}));
							}
						);
					}
				});
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [cameras, rtcConnection]);

	return (
		<RTCConnectionContext.Provider value={[rtcConnection, setRTCConnection]}>
			<HeartbeatFleetContext.Provider value={[heartbeatData, setHeartbeatData]}>
				<LocationFleetContext.Provider value={[locationData, setLocationData]}>
					<CarSpeedFleetContext.Provider
						value={[carSpeedData, setCarSpeedData]}
					>
						{props.children}
					</CarSpeedFleetContext.Provider>
				</LocationFleetContext.Provider>
			</HeartbeatFleetContext.Provider>
		</RTCConnectionContext.Provider>
	);
}
