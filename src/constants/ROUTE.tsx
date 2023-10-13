export enum ROUTE {
	DASHBOARD = '/dashboard',
	OVERVIEW = ROUTE.DASHBOARD + '/overview',
	CAMERA = ROUTE.DASHBOARD + '/camera',
	EMERGENCY = ROUTE.DASHBOARD + '/emergency',
	HEARTBEAT = ROUTE.DASHBOARD + '/heartbeat',
	ENTITY_MANAGEMENT = '/entity_management',
	CARS = ROUTE.ENTITY_MANAGEMENT + '/cars',
	DRIVERS = ROUTE.ENTITY_MANAGEMENT + '/drivers',
	CAMERAS = ROUTE.ENTITY_MANAGEMENT + '/cameras',
	RSUS = ROUTE.ENTITY_MANAGEMENT + '/rsus',
}

export enum ASSETS_PATH {
	MAP_ASSETS = '/mapAssets',
	MAP_PIN = MAP_ASSETS + '/PIN',
	MAP_CAR_PROFILE = MAP_ASSETS + '/PROFILE/car_profile_',
	CAR_PIN = MAP_PIN + '/car_pin_',
	RSU_PIN = MAP_PIN + '/rsu_pin.svg',
}