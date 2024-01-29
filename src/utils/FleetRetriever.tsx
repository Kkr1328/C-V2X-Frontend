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

// --------------------------------------------- HEARTBEATS ---------------------------------------------
export function rsuStatus(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	return heartbeatContextData.RSU[id]?.data.status || STATUS.INACTIVE;
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

	if (!heartbeatContextData.CAR[id]) return STATUS.INACTIVE;
	if (
		pendingEmergency?.some((emergency: IEmergency) => emergency.car_id === id)
	)
		return STATUS.EMERGENCY;
	return heartbeatContextData.CAR[id]?.data.status || STATUS.INACTIVE;
}

export function cameraStatus(position?: Position, car_id?: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const carId = car_id || '';
	const car = heartbeatContextData.CAR[carId]?.data;

	if (!car || carStatus(carId) === STATUS.INACTIVE) {
		return STATUS.INACTIVE;
	}

	switch (position) {
		case 'Front':
			return car.front_camera || STATUS.INACTIVE;
		case 'Back':
			return car.back_camera || STATUS.INACTIVE;
		case 'Left':
			return car.left_camera || STATUS.INACTIVE;
		case 'Right':
			return car.right_camera || STATUS.INACTIVE;
		default:
			return STATUS.INACTIVE;
	}
}

export function rsusHeartbeat(rsus: IRSU[]) {
	return rsus.map((rsu: IRSU): IRSUHeartbeat => {
		return {
			...rsu,
			status: rsuStatus(rsu.id),
		};
	});
}

export function carsHeartbeat(cars: ICar[]) {
	return cars.map((car: ICar): ICarHeartbeat => {
		return {
			...car,
			status: carStatus(car.id),
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

export function resetHeartbeat() {
	const [_, setHeartbeatContextData] = useContext(HeartbeatFleetContext);
	setHeartbeatContextData({ CAR: {}, RSU: {} });
}

// --------------------------------------------- LOCATIONS ---------------------------------------------
export function rsuLocation(id: string) {
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.RSU[id];

	if (rsuStatus(id) === STATUS.INACTIVE || !location) return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
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

export function handleRSULocate(router: AppRouterInstance, id: string) {
	if (rsuStatus(id) === STATUS.INACTIVE || rsuLocation(id)) return;

	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

export function handleCarLocate(router: AppRouterInstance, id: string) {
	if (carStatus(id) === STATUS.INACTIVE || carLocation(id)) return;

	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

// --------------------------------------------- SPEEDS ---------------------------------------------
export function carSpeed(id: string) {
	const [speedContextData] = useContext(CarSpeedFleetContext);
	const speed = speedContextData[id];

	if (carStatus(id) === STATUS.INACTIVE || !speed) return;
	return `${speed.velocity} ${speed.unit}`;
}

// --------------------------------------------- CONNECTIONS ---------------------------------------------
export function connectedCars(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	if (!heartbeatContextData.RSU[id]) return [];

	return heartbeatContextData.RSU[id]?.data.connected_OBU;
}
