import { CarsProps, DriversProps } from '@/types/ENTITY';
import { ICamera } from '@/types/models/camera.model';
import { IRSU } from '@/types/models/rsu.model';

export const MockedCarsTableContent: CarsProps[] = [
	{
		id: 'carxxx01',
		name: 'Car01',
		license_plate: 'AB 0001',
		model: 'Model01',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver01',
	},
	{
		id: 'carxxx02',
		name: 'Car02',
		license_plate: 'AB 0002',
		model: 'Model02',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver02',
	},
	{
		id: 'carxxx03',
		name: 'Car03',
		license_plate: 'AB 0003',
		model: 'Model03',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver03',
	},
	{
		id: 'carxxx04',
		name: 'Car04',
		license_plate: 'AB 0004',
		model: 'Model04',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver04',
	},
	{
		id: 'carxxx05',
		name: 'Car05',
		license_plate: 'AB 0005',
		model: 'Model05',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver05',
	},
	{
		id: 'carxxx06',
		name: 'Car06',
		license_plate: 'AB 0006',
		model: 'Model06',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver06',
	},
	{
		id: 'carxxx07',
		name: 'Car07',
		license_plate: 'AB 0007',
		model: 'Model07',
		cameras: [
			{ id: 'Came01', name: 'Cam01', position: 'Front' },
			{ id: 'Came02', name: 'Cam02', position: 'Back' },
		],
		driver_id: 'Driver07',
	},
];
export const MockedDriversTableContent: DriversProps[] = [
	{
		id: 'driverxxx01',
		name: 'Driver01 driver01',
		first_name: 'Driver01',
		last_name: 'driver01',
		username: 'Somchai01',
		phone_no: '098xxxx001',
	},
	{
		id: 'driverxxx02',
		name: 'Driver02 driver02',
		first_name: 'Driver02',
		last_name: 'driver02',
		username: 'Somchai02',
		phone_no: '098xxxx002',
	},
	{
		id: 'driverxxx03',
		name: 'Driver03 driver03',
		first_name: 'Driver03',
		last_name: 'driver03',
		username: 'Somchai03',
		phone_no: '098xxxx003',
	},
	{
		id: 'driverxxx04',
		name: 'Driver04 driver04',
		first_name: 'Driver04',
		last_name: 'driver04',
		username: 'Somchai04',
		phone_no: '098xxxx004',
	},
	{
		id: 'driverxxx05',
		name: 'Driver05 driver05',
		first_name: 'Driver05',
		last_name: 'driver05',
		username: 'Somchai05',
		phone_no: '098xxxx005',
	},
	{
		id: 'driverxxx06',
		name: 'Driver06 driver06',
		first_name: 'Driver06',
		last_name: 'driver06',
		username: 'Somchai06',
		phone_no: '098xxxx006',
	},
	{
		id: 'driverxxx07',
		name: 'Driver07 driver07',
		first_name: 'Driver07',
		last_name: 'driver07',
		username: 'Somchai07',
		phone_no: '098xxxx007',
	},
];
export const MockedCamerasTableContent: ICamera[] = [
	{
		id: 'cameraxxx01',
		name: 'Camera01',
		position: 'Front',
		car_id: 'Car01',
		car: 'Car01',
	},
	{
		id: 'cameraxxx02',
		name: 'Camera02',
		position: 'Back',
		car_id: 'Car02',
		car: 'Car02',
	},
	{
		id: 'cameraxxx03',
		name: 'Camera03',
		position: 'Front',
		car_id: 'Car03',
		car: 'Car03',
	},
	{
		id: 'cameraxxx04',
		name: 'Camera04',
		position: 'Back',
		car_id: 'Car04',
		car: 'Car04',
	},
	{
		id: 'cameraxxx05',
		name: 'Camera05',
		position: 'Front',
		car_id: 'Car05',
		car: 'Car05',
	},
	{
		id: 'cameraxxx06',
		name: 'Camera06',
		position: 'Back',
		car_id: 'Car06',
		car: 'Car06',
	},
	{
		id: 'cameraxxx07',
		name: 'Camera07',
		position: 'Front',
		car_id: 'Car07',
		car: 'Car07',
	},
];

export const MockedRSUsTableContent: IRSU[] = [
	{
		id: 'rsuxxx01',
		name: 'RSU01',
		recommended_speed: '50',
	},
	{
		id: 'rsuxxx02',
		name: 'RSU02',
		recommended_speed: '70',
	},
	{
		id: 'rsuxxx03',
		name: 'RSU03',
		recommended_speed: '30',
	},
	{
		id: 'rsuxxx04',
		name: 'RSU04',
		recommended_speed: '90',
	},
	{
		id: 'rsuxxx05',
		name: 'RSU05',
		recommended_speed: '80',
	},
	{
		id: 'rsuxxx06',
		name: 'RSU06',
		recommended_speed: '20',
	},
	{
		id: 'rsuxxx07',
		name: 'RSU07',
		recommended_speed: '40',
	},
];
