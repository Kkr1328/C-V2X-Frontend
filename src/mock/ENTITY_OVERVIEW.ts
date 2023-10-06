import {
    CarCard,
	CarLocation, 
	RSUInformation
} from '@/types/OVERVIEW';

export const MockedCars: CarCard[] = [
	{
		id: 'carxxx01',
		name: 'Car01',
		cameras: [
			{
				name: "camera01",
				position: "Front"
			},
			{
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
		status: 'NORMAL'
	} ,
	{
		id: 'carxxx02',
		name: 'Car02',
		cameras: [
			{
				name: "camera01",
				position: "Front"
			},
			{
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
		status: 'NORMAL'
	},
	{
		id: 'carxxx03',
		name: 'Car03',
		cameras: [
			{
				name: "camera01",
				position: "Front"
			},
			{
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
		status: 'NORMAL'
	}
]

export const MockedCarLocation: CarLocation[] = [
	{
		id: 'carxxx01',
		name: 'Car 01',
		location: {
			lat : 13.787528639832523,
			lng: 100.54476506712641
		}
	}, 
	{
		id: 'carxxx02',
		name: 'Car 02',
		location: {
			lat : 13.787528639832523,
			lng: 100.53476506712641
		}
	},
	{
		id: 'carxxx03',
		name: 'Car 03',
		location: {
			lat : 13.798528639832523,
			lng: 100.55176506712641
		}
	}
]

export const MockedRSU: RSUInformation[] = [
	{
		id: 'RSUxxx01',
		name: 'RSU 01',
		location: {
			lat : 13.777528639832523,
			lng: 100.54476506712641
		},
		radius: 1000,
		recommendSpeed: "50 km/h"
	},
	{
		id: 'RSUxxx02',
		name: 'RSU 02',
		location: {
			lat : 13.778528639832523,
			lng: 100.56076506712641
		},
		radius: 500,
		recommendSpeed: "50 km/h"
	}
]