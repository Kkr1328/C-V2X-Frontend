export const StatusDotType = [
	'Active',
	'Warning',
	'Emergency',
	'Inactive',
	'Missing',
] as const;

export interface ICarHeartbeat {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
	front_cam: (typeof StatusDotType)[number];
	back_cam: (typeof StatusDotType)[number];
}

export interface IRSUHeartbeat {
	id: string;
	name: string;
	status: (typeof StatusDotType)[number];
}
