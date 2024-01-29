// react
import { useContext } from 'react';
// next
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
// const
import { STATUS } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
// types
import { Position } from '@/types/COMMON';
import { ICar } from '@/types/models/car.model';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';
import { IRSU } from '@/types/models/rsu.model';
// contexts
import {
	CarSpeedFleetContext,
	HeartbeatFleetContext,
	LocationFleetContext,
} from '@/context/fleet';
import { useQuery } from '@tanstack/react-query';
import { getEmergencyListAPI } from '@/services/api-call';
import { IEmergency } from '@/types/models/emergency.model';

export function handleRSULocate(router: AppRouterInstance, id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const [locationContextData] = useContext(LocationFleetContext);

	if (heartbeatContextData.RSU[id] && locationContextData.RSU[id]) {
		return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
	}
	return undefined;
}

export function handleCarLocate(router: AppRouterInstance, id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const [locationContextData] = useContext(LocationFleetContext);

	if (heartbeatContextData.CAR[id] && locationContextData.CAR[id]) {
		return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
	}
	return undefined;
}

export function resetHeartbeat() {
	const [_, setHeartbeatContextData] = useContext(HeartbeatFleetContext);
	setHeartbeatContextData({ CAR: {}, RSU: {} });
}

export function carsHeartbeat(cars: ICar[]) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	const { data: dataGetEmergencyList } = useQuery({
		queryKey: ['getEmergencyList'],
		queryFn: async () => await getEmergencyListAPI(),
	});

	const pendingEmergency = dataGetEmergencyList?.filter(
		(emergency: IEmergency) => emergency.status === 'pending'
	);

	return cars.map((car: ICar): ICarHeartbeat => {
		const status = heartbeatContextData.CAR[car.id]
			? pendingEmergency.some(
					(emergency: IEmergency) => emergency.car_id === car.id
			  )
				? STATUS.EMERGENCY
				: heartbeatContextData.CAR[car.id]?.data.status ?? STATUS.INACTIVE
			: STATUS.INACTIVE;

		return {
			...car,
			status: status,
			front_cam: car.cameras.some((camera) => camera.position === 'Front')
				? cameraStatus('Front', car.id)
				: STATUS.MISSING,
			back_cam: car.cameras.some((camera) => camera.position === 'Back')
				? cameraStatus('Back', car.id)
				: STATUS.MISSING,
			left_cam: car.cameras.some((camera) => camera.position === 'Left')
				? cameraStatus('Left', car.id)
				: STATUS.MISSING,
			right_cam: car.cameras.some((camera) => camera.position === 'Right')
				? cameraStatus('Right', car.id)
				: STATUS.MISSING,
		};
	});
}

export function rsusHeartbeat(rsus: IRSU[]) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	return rsus.map((rsu: IRSU): IRSUHeartbeat => {
		return {
			...rsu,
			status: heartbeatContextData.RSU[rsu.id]?.data.status ?? STATUS.INACTIVE,
		};
	});
}

export function rsuStatus(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	return heartbeatContextData.RSU[id]?.data.status || STATUS.INACTIVE;
}

export function cameraStatus(position?: Position, car_id?: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	const cameraData =
		position === 'Front'
			? heartbeatContextData.CAR[car_id ?? '']?.data.front_camera
			: position === 'Back'
			? heartbeatContextData.CAR[car_id ?? '']?.data.back_camera
			: position === 'Left'
			? heartbeatContextData.CAR[car_id ?? '']?.data.left_camera
			: position === 'Right'
			? heartbeatContextData.CAR[car_id ?? '']?.data.right_camera
			: undefined;
	return cameraData || STATUS.INACTIVE;
}

export function carStatus(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	const { data: dataGetEmergencyList } = useQuery({
		queryKey: ['getEmergencyList'],
		queryFn: async () => await getEmergencyListAPI(),
	});

	const pendingEmergency = dataGetEmergencyList?.filter(
		(emergency: IEmergency) => emergency.status === 'pending'
	);

	return heartbeatContextData.CAR[id]
		? pendingEmergency?.some((emergency: IEmergency) => emergency.car_id === id)
			? STATUS.EMERGENCY
			: heartbeatContextData.CAR[id]?.data.status ?? STATUS.INACTIVE
		: STATUS.INACTIVE;
}

export function carSpeed(id: string) {
	const [speedContextData] = useContext(CarSpeedFleetContext);
	const speed = speedContextData[id];

	if (carStatus(id) === STATUS.INACTIVE || speed === undefined) return;
	return `${speed.velocity} ${speed.unit}`;
}

export function connectedCars(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	if (!heartbeatContextData.RSU[id]) return [];

	return heartbeatContextData.RSU[id]?.data.connected_OBU;
}

export function carLocation(id: string) {
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.CAR[id];

	if (carStatus(id) === STATUS.INACTIVE || location === undefined) return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

export function rsuLocation(id: string) {
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.RSU[id];

	if (rsuStatus(id) === STATUS.INACTIVE || location === undefined) return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}
