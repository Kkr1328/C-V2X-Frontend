// react
import { useContext } from 'react';
// next
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
// const
import { STATUS } from '@/constants/LABEL';
import { ROUTE } from '@/constants/ROUTE';
// types
import { ICar } from '@/types/models/car.model';
import { ICarHeartbeat, IRSUHeartbeat } from '@/types/models/heartbeat.model';
import { IRSU } from '@/types/models/rsu.model';
// contexts
import {
	CarSpeedFleetContext,
	HeartbeatFleetContext,
	LocationFleetContext,
} from '@/context/FleetContext';
import { getEmergencyListAPI, getRSUAPI } from '@/services/api-call';
import { IEmergency } from '@/types/models/emergency.model';
import { useQuery } from '@tanstack/react-query';

// --------------------------------------------- HEARTBEATS ---------------------------------------------
export function useRSUStatus(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	if (!heartbeatContextData.RSU[id]) return STATUS.INACTIVE;
	return heartbeatContextData.RSU[id]?.data.status || STATUS.INACTIVE;
}

export function useCarStatus(id: string) {
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

	if (
		!heartbeatContextData.CAR[id] ||
		heartbeatContextData.CAR[id]?.data.status === STATUS.INACTIVE
	)
		return STATUS.INACTIVE;
	if (
		pendingEmergency?.some((emergency: IEmergency) => emergency.car_id === id)
	)
		return STATUS.EMERGENCY;
	if (
		!locationContextData.CAR[id] ||
		!locationContextData.CAR[id]?.latitude ||
		!locationContextData.CAR[id]?.longitude ||
		!speedContextData[id] ||
		!speedContextData[id]?.velocity
	)
		return STATUS.WARNING;
	return heartbeatContextData.CAR[id]?.data.status || STATUS.INACTIVE;
}

export function useCameraStatus(camera_id?: string, car_id?: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);
	const cameraId = camera_id || '';
	const carId = car_id || '';
	const statusCar = useCarStatus(carId);
	const cameraStatus = heartbeatContextData.CAMERA[cameraId]?.data.status;

	if (statusCar === STATUS.INACTIVE) {
		return STATUS.INACTIVE;
	}
	return cameraStatus || STATUS.INACTIVE;
}

export function useRSUsHeartbeat(rsus: IRSU[]) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	return rsus.map((rsu: IRSU): IRSUHeartbeat => {
		let status;
		if (!heartbeatContextData.RSU[rsu.id]) status = STATUS.INACTIVE;
		else
			status = heartbeatContextData.RSU[rsu.id]?.data.status || STATUS.INACTIVE;
		return {
			...rsu,
			status: status,
		};
	});
}

export function useCarsHeartbeat(cars: ICar[]) {
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
		if (
			!heartbeatContextData.CAR[car.id] ||
			heartbeatContextData.CAR[car.id]?.data.status === STATUS.INACTIVE
		)
			status = STATUS.INACTIVE;
		else if (
			pendingEmergency?.some(
				(emergency: IEmergency) => emergency.car_id === car.id
			)
		)
			status = STATUS.EMERGENCY;
		else if (
			!locationContextData.CAR[car.id] ||
			!locationContextData.CAR[car.id]?.latitude ||
			!locationContextData.CAR[car.id]?.longitude ||
			!speedContextData[car.id] ||
			!speedContextData[car.id]?.velocity
		)
			status = STATUS.WARNING;
		else
			status = heartbeatContextData.CAR[car.id]?.data.status || STATUS.INACTIVE;

		const frontCamera = car.cameras.find(
			(camera) => camera.position === 'Front'
		);
		const backCamera = car.cameras.find((camera) => camera.position === 'Back');
		const leftCamera = car.cameras.find((camera) => camera.position === 'Left');
		const rightCamera = car.cameras.find(
			(camera) => camera.position === 'Right'
		);

		return {
			...car,
			status: status,
			front_cam: frontCamera
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAMERA[frontCamera.id]?.data.status ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			back_cam: backCamera
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAMERA[backCamera.id]?.data.status ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			left_cam: leftCamera
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAMERA[leftCamera.id]?.data.status ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
			right_cam: rightCamera
				? status === STATUS.INACTIVE
					? STATUS.INACTIVE
					: heartbeatContextData.CAMERA[rightCamera.id]?.data.status ||
					  STATUS.INACTIVE
				: STATUS.MISSING,
		};
	});
}

// --------------------------------------------- LOCATIONS ---------------------------------------------
export function useRSULocation(id: string) {
	const { data: rsu } = useQuery({
		queryKey: ['getRSU', id],
		queryFn: async () => {
			if (id && id !== '') {
				const response = await getRSUAPI({ id });
				return response as IRSU;
			}
			return {} as IRSU;
		},
	});
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.RSU[id || ''];
	const statusRSU = useRSUStatus(id);

	if (!rsu) return;
	if (
		statusRSU === STATUS.INACTIVE ||
		!location ||
		!location.latitude ||
		!location.longitude
	)
		return {
			lat: parseFloat((rsu as IRSU).latitude),
			lng: parseFloat((rsu as IRSU).longitude),
		};

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

export function useCarLocation(id: string) {
	const [locationContextData] = useContext(LocationFleetContext);
	const location = locationContextData.CAR[id];
	const statusCar = useCarStatus(id);

	if (
		statusCar === STATUS.INACTIVE ||
		!location ||
		!location.latitude ||
		!location.longitude
	)
		return;

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

export function useHandleRSULocate(router: AppRouterInstance, id: string) {
	const statusRSU = useRSUStatus(id);
	const locationRSU = useRSULocation(id);

	if (statusRSU === STATUS.INACTIVE || !locationRSU) return;
	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

export function useHandleCarLocate(router: AppRouterInstance, id: string) {
	const statusCar = useCarStatus(id);
	const locationCar = useCarLocation(id);

	if (statusCar === STATUS.INACTIVE || !locationCar) return;
	return () => router.push(`${ROUTE.OVERVIEW}?id=${id}`);
}

// --------------------------------------------- SPEEDS ---------------------------------------------
export function useCarSpeed(id: string) {
	const [speedContextData] = useContext(CarSpeedFleetContext);
	const speed = speedContextData[id];
	const statusCar = useCarStatus(id);

	if (statusCar === STATUS.INACTIVE || !speed) return;
	return `${speed.velocity} ${speed.unit}`;
}

// --------------------------------------------- CONNECTIONS ---------------------------------------------
export function useConnectedCars(id: string) {
	const [heartbeatContextData] = useContext(HeartbeatFleetContext);

	if (!heartbeatContextData.RSU[id]) return [];

	const connectedCars = heartbeatContextData.RSU[id]?.data.connected_OBU || [];
	const onlineConnectedCars = connectedCars.filter(
		(car_id) =>
			heartbeatContextData.CAR[car_id] &&
			heartbeatContextData.CAR[car_id]?.data.status !== STATUS.INACTIVE
	);

	return onlineConnectedCars;
}
