import { PILL_LABEL } from '@/constants/LABEL';
import {
    CarCard,
	StuffLocation, 
	RSUInformation
} from '@/types/OVERVIEW';

export const MockedCars: CarCard[] = [
	{
		id: 'carxxx01',
		name: 'Car01',
		cameras: [
			{
				id: "camera01",
				name: "camera01",
				position: "Front"
			},
			{
				id: "camera01",
				name: "camera02",
				position: "Back"
			}
		],
		speed: '50 km/h',
		driver: {
			id: 'driverxxxx01',
			first_name: 'nice',
			last_name: 'cool',
			phone_no: '08xxxxxxxx'
		},
		status: PILL_LABEL.EMERGENCY
	} ,
	{
		id: 'carxxx02',
		name: 'Car02',
		cameras: [
			{
				id: "camera01",
				name: "camera01",
				position: "Front"
			},
			{
				id: "camera02",
				name: "camera02",
				position: "Back"
			}
		],
		speed: '80 km/h',
		driver: {
			id: 'driverxxxx01',
			first_name: 'love',
			last_name: 'drink',
			phone_no: '08xxxxxxxx'
		},
		status: PILL_LABEL.WARNING
	},
	{
		id: 'carxxx03',
		name: 'Car03',
		cameras: [
			{
				id: "camera01",
				name: "camera01",
				position: "Front"
			},
			{
				id: "camera02",
				name: "camera02",
				position: "Back"
			}
		],
		speed: '80 km/h',
		driver: {
			id: 'driverxxxx03',
			first_name: 'mark',
			last_name: 'cu',
			phone_no: '08xxxxxxxx'
		},
		status: PILL_LABEL.ACTIVE
	}
]

export const MockedCarLocation: StuffLocation[] = [
	{
		id: 'carxxx01',
		type: 'CAR',
		location: {
			lat : 13.787528639832523,
			lng: 100.54476506712641
		},
		status: PILL_LABEL.EMERGENCY
	}, 
	{
		id: 'carxxx02',
		type: 'CAR',
		location: {
			lat : 13.787528639832523,
			lng: 100.53476506712641
		},
		status: PILL_LABEL.WARNING
	},
	{
		id: 'carxxx03',
		type: 'CAR',
		location: {
			lat : 13.798528639832523,
			lng: 100.55176506712641
		},
		status: PILL_LABEL.ACTIVE
	}
]

export const MockedRSU: RSUInformation[] = [
	{
		id: 'RSUxxx01',
		name: 'RSU 01',
		type: 'RSU',
		location: {
			lat : 13.777528639832523,
			lng: 100.54476506712641
		},
		radius: 1000,
		recommendSpeed: "50 km/h",
		connectedCar: [
			{
				name: 'car 01',
				speed: '30 km/h',
				status: PILL_LABEL.ACTIVE
			},
			{
				name: 'car 02',
				speed: '37 km/h',
				status: PILL_LABEL.WARNING
			}
		]
	},
	{
		id: 'RSUxxx02',
		name: 'RSU 02',
		type: 'RSU',
		location: {
			lat : 13.778528639832523,
			lng: 100.56076506712641
		},
		radius: 500,
		recommendSpeed: "50 km/h",
		connectedCar: [
			{
				name: 'car 01',
				speed: '30 km/h',
				status: PILL_LABEL.ACTIVE
			},
			{
				name: 'car 02',
				speed: '200 km/h',
				status: PILL_LABEL.EMERGENCY
			}
		]
	}
]