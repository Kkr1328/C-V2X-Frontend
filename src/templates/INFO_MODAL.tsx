// react
import { useEffect, useState } from 'react';
// const
import { INPUT_LABEL } from '@/constants/LABEL';
// types
import { InputFieldProp } from '@/types/COMMON';
import { ICamera } from '@/types/models/camera.model';
import { ICarInfo } from '@/types/models/car.model';
import { IDriver } from '@/types/models/driver.model';
import { IRSU } from '@/types/models/rsu.model';

export function CarInfoModalTemplate(): InputFieldProp<ICarInfo>[] {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const isUseCompact = windowWidth <= 640;

	return [
		{
			id: 'license_plate',
			label: INPUT_LABEL.LICENSE_PLATE,
			type: 'TextField',
			row: isUseCompact ? 1 : 1,
		},
		{
			id: 'model',
			label: INPUT_LABEL.MODEL,
			type: 'TextField',
			row: isUseCompact ? 2 : 1,
		},
		{
			id: 'driver',
			label: INPUT_LABEL.DRIVER,
			type: 'TextField',
			row: isUseCompact ? 3 : 2,
		},
		{
			id: 'front_cam_name',
			label: INPUT_LABEL.CAMERAS,
			type: 'TextField',
			row: isUseCompact ? 4 : 3,
		},
		{
			id: 'front_cam_position',
			label: INPUT_LABEL.POSITION,
			type: 'TextField',
			row: isUseCompact ? 5 : 3,
		},
		{
			id: 'back_cam_name',
			label: INPUT_LABEL.CAMERAS,
			type: 'TextField',
			row: isUseCompact ? 6 : 4,
		},
		{
			id: 'back_cam_position',
			label: INPUT_LABEL.POSITION,
			type: 'TextField',
			row: isUseCompact ? 7 : 4,
		},
	];
}

export function DriverInfoModalTemplate(): InputFieldProp<IDriver>[] {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const isUseCompact = windowWidth <= 640;

	return [
		{
			id: 'username',
			label: INPUT_LABEL.USERNAME,
			type: 'TextField',
			row: isUseCompact ? 1 : 1,
		},
		{
			id: 'phone_no',
			label: INPUT_LABEL.PHONE_NO,
			type: 'TextField',
			row: isUseCompact ? 2 : 1,
		},
	];
}

export function CameraInfoModalTemplate(): InputFieldProp<ICamera>[] {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const isUseCompact = windowWidth <= 640;
	return [
		{
			id: 'car',
			label: INPUT_LABEL.CAR,
			type: 'Select',
			row: isUseCompact ? 1 : 1,
		},
		{
			id: 'position',
			label: INPUT_LABEL.POSITION,
			type: 'Select',
			row: isUseCompact ? 2 : 1,
		},
	];
}

export function RSUInfoModalTemplate(): InputFieldProp<IRSU>[] {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const isUseCompact = windowWidth <= 640;

	return [
		{
			id: 'recommended_speed',
			label: INPUT_LABEL.RECOMENDED_SPEED,
			type: 'TextField',
			row: isUseCompact ? 1 : 1,
		},
	];
}
