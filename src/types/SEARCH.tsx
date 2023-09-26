export type Position = 'Front' | 'Back';

export interface CarSearchRequest {
	id: string;
	name: string;
	license_plate: string;
	model: string;
	front_camera: string;
	back_camera: string;
	driver: string;
}
export interface CameraSearchRequest {
	id: string;
	name: string;
	position: Position;
	car: string;
}
export interface DriverSearchRequest {
	id: string;
	name: string;
	username: string;
	phone_no: string;
}
export interface RSUSearchRequest {}

export interface CameraSearchResponse {}
export interface CarSearchResponse {}
export interface DriverSearchResponse {}
export interface RSUSearchResponse {}
