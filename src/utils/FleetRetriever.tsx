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
	const [locationContextData] = useContext(LocationFleetContext);

	if (!locationContextData.RSU[id]) return STATUS.WARNING;

	return heartbeatContextData.RSU[id]?.data.status || STATUS.INACTIVE;
}

export function carStatus(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const [locationContextData] = useContext(LocationFleetContext);
	const [speedContextData] = useContext(CarSpeedFleetContext);

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
	if (!locationContextData.CAR[id] || !speedContextData[id])
		return STATUS.WARNING;
	return heartbeatContextData.CAR[id]?.data.status || STATUS.INACTIVE;
}

export function cameraStatus(position?: Position, car_id?: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const carId = car_id || '';
	const car = heartbeatContextData.CAR[carId]?.data;
	const statusCar = carStatus(carId);

	if (!car || statusCar === STATUS.INACTIVE) {
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
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const [locationContextData] = useContext(LocationFleetContext);

	return rsus.map((rsu: IRSU): IRSUHeartbeat => {
		let status;
		if (!locationContextData.RSU[rsu.id]) status = STATUS.WARNING;
		else
			status = heartbeatContextData.RSU[rsu.id]?.data.status || STATUS.INACTIVE;
		return {
			...rsu,
			status: status,
		};
	});
}

export function carsHeartbeat(cars: ICar[]) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const [locationContextData] = useContext(LocationFleetContext);
	const [speedContextData] = useContext(CarSpeedFleetContext);

	const { data: dataGetEmergencyList } = useQuery({
		queryKey: ['getEmergencyList'],
		queryFn: async () => await getEmergencyListAPI(),
	});
	const pendingEmergency = dataGetEmergencyList?.filter(
		(emergency: IEmergency) => emergency.status === 'pending'
	);

	return cars.map((car: ICar): ICarHeartbeat => {
		let status;
		if (!heartbeatContextData.CAR[car.id]) status = STATUS.INACTIVE;
		else if (
			pendingEmergency?.some(
				(emergency: IEmergency) => emergency.car_id === car.id
			)
		)
			status = STATUS.EMERGENCY;
		else if (!locationContextData.CAR[car.id] || !speedContextData[car.id])
			status = STATUS.WARNING;
		else
			status = heartbeatContextData.CAR[car.id]?.data.status || STATUS.INACTIVE;

		return {
			...car,
			status: status,
			front_cam: car.cameras.some((camera) => camera.position === 'Front')
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAR[car.id]?.data.front_camera ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			back_cam: car.cameras.some((camera) => camera.position === 'Back')
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAR[car.id]?.data.back_camera ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			left_cam: car.cameras.some((camera) => camera.position === 'Left')
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAR[car.id]?.data.left_camera ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			right_cam: car.cameras.some((camera) => camera.position === 'Right')
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAR[car.id]?.data.right_camera ||
					  STATUS.INACTIVE
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
	const statusRSU = rsuStatus(id);

	if (statusRSU === STATUS.INACTIVE || !location) return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

export function carLocation(id: string) {
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.CAR[id];
	const statusCar = carStatus(id);

	if (statusCar === STATUS.INACTIVE || location === undefined) return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

export function handleRSULocate(router: AppRouterInstance, id: string) {
	const statusRSU = rsuStatus(id);
	const locationRSU = rsuLocation(id);

	if (statusRSU === STATUS.INACTIVE || !locationRSU) return;
	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

export function handleCarLocate(router: AppRouterInstance, id: string) {
	const statusCar = carStatus(id);
	const locationCar = carLocation(id);

	if (statusCar === STATUS.INACTIVE || !locationCar) return;
	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

// --------------------------------------------- SPEEDS ---------------------------------------------
export function carSpeed(id: string) {
	const [speedContextData] = useContext(CarSpeedFleetContext);
	const speed = speedContextData[id];
	const statusCar = carStatus(id);

	if (statusCar === STATUS.INACTIVE || !speed) return;
	return `${speed.velocity} ${speed.unit}`;
}

// --------------------------------------------- CONNECTIONS ---------------------------------------------
export function connectedCars(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	if (!heartbeatContextData.RSU[id]) return [];

	return heartbeatContextData.RSU[id]?.data.connected_OBU;
}
