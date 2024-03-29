export enum NAVBAR_LABEL {
	DASHBOARD = 'Dashboard',
	OVERVIEW = 'Overview',
	CAMERA = 'Camera',
	PANOPTIC = 'Panoptic',
	EMERGENCY = 'Emergency',
	HEARTBEAT = 'Heartbeat',
	ENTITY_MANAGEMENT = 'Entity Management',
	CARS = 'Cars',
	DRIVERS = 'Drivers',
	CAMERAS = 'Cameras',
	RSUS = 'RSUs',
	EXPAND = 'Expand',
	COLLAPSE = 'Collapse',
}

export enum INPUT_LABEL {
	ID = 'ID',
	CAMERA = 'Camera',
	FRONT_CAMERA = 'Front Camera',
	BACK_CAMERA = 'Back Camera',
	LEFT_CAMERA = 'Left Camera',
	RIGHT_CAMERA = 'Right Camera',
	NAME = 'Name',
	LICENSE_PLATE = 'License Plate',
	MODEL = 'Model',
	DRIVER = 'Driver',
	FIRST_NAME = 'First Name',
	LAST_NAME = 'Last Name',
	USERNAME = 'Username',
	PASSWORD = 'Password',
	CONFIRMED_PASSWORD = 'Confirmed Password',
	PHONE_NO = 'Phone NO.',
	CAR = 'Car',
	POSITION = 'Position',
	RECOMENDED_SPEED = 'Recommended Speed (km/h)',
	ACTION = 'Action',
	DATE = 'Date',
	LATITUDE = 'Latitude',
	LONGITUDE = 'Longitude',
}

export enum BUTTON_LABEL {
	CLEAR = 'Clear',
	SEARCH = 'Search',
	REGISTER = 'Register',
	REGISTER_CAR = 'Register a new car',
	REGISTER_DRIVER = 'Register a new driver',
	REGISTER_CAMERA = 'Register a new camera',
	REGISTER_RSU = 'Register a new RSU',
	REFRESH = 'Refresh',
	UPDATE = 'Update',
	DELETE = 'Delete',
	CANCEL = 'Cancel',
	CONFIRM = 'Confirm',
	ZOOM = 'Zoom',
	MISSING = 'Missing',
	LOCATION = 'Location',
	STATUS = 'Status',
	NO_DATA = 'No results found',
	VISIBLE = 'Visible',
	INVISIBLE = 'Invisible',
	CANCLE = 'Cancle',
	HELP = 'Help',
	NO_VDO = 'No video',
}

export enum STATUS {
	ALL = 'All',
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
	EMERGENCY = 'Emergency',
	WARNING = 'Warning',
	MISSING = 'Missing',
}

export enum MODAL_LABEL {
	REGISTER_CAR = 'Register a new car',
	REGISTER_DRIVER = 'Register a new driver',
	REGISTER_CAMERA = 'Register a new camera',
	REGISTER_RSU = 'Register a new RSU',
	UPDATE_CAR = "Update car's ID : ",
	UPDATE_DRIVER = "Update driver's ID : ",
	UPDATE_CAMERA = "Update camera's ID : ",
	UPDATE_RSU = "Update RSU's ID : ",
	ARE_YOU_SURE = 'Are you sure?',
	DO_YOU_REALLY_DELETE = 'Do you really to delete ',
	THIS_PROCESS_CANNOT_UNDONE = ' record? This process cannot be undone.',
}

export enum EMERGENCY_CARD_LABEL {
	DRIVER_CONTACT = 'Driver contract: ',
}

export enum TAB_LABEL {
	ORIGINAL = 'ORIGINAL',
	OBJECT = 'OBJ DETECTION',
	// PANOPTIC = 'PANAOPTIC',
}
export enum OVERVIEW_SUMMARY_CARD_LABEL {
	ACTIVE_CAR = 'Active car(s)',
	ACTIVE_DRIVER = 'Active driver(s)',
	ACTIVE_RSU = 'Active RSU(s)',
	PENDING_EMERGENCY = 'PENDING emergency',
	IN_PROGRESS_EMERGENCY = 'IN PROGRESS emergency',
}

export enum HEARTBEAT_TABLE_LABEL {
	CAR = 'Car',
	FRONT_CAM = 'Front camera',
	BACK_CAM = 'Back camera',
	LEFT_CAM = 'Left camera',
	RIGHT_CAM = 'Right camera',
	RSU = 'RSU',
	STATUS = 'Status',
	ACTION = 'Action',
}
