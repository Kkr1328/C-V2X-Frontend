import { combineReducers } from 'redux';
import getRSUsReducer from './get-rsus/get-rsus-reducer';
import createRSUReducer from './create-rsu/create-rsu-reducer';
import updateRSUReducer from './update-rsu/update-rsu-reducer';
import deleteRSUReducer from './delete-rsu/delete-rsu-reducer';
import deleteDriverReducer from './delete-driver/delete-driver-reducer';
import deleteCarReducer from './delete-car/delete-car-reducer';
import deleteCameraReducer from './delete-camera/delete-camera-reducer';
import createCameraReducer from './create-camera/create-camera-reducer';
import createCarReducer from './create-car/create-car-reducer';
import createDriverReducer from './create-driver/create-driver-reducer';
import updateCameraReducer from './update-camera/update-camera-reducer';
import updateCarReducer from './update-car/update-car-reducer';
import updateDriverReducer from './update-driver/update-driver-reducer';
import getCamerasReducer from './get-cameras/get-cameras-reducer';
import getCarsReducer from './get-cars/get-cars-reducer';
import getDriversReducer from './get-drivers/get-drivers-reducer';
import getRSUReducer from './get-rsu/get-rsu-reducer';
import getCameraReducer from './get-camera/get-camera-reducer';
import getCarReducer from './get-car/get-car-reducer';
import getDriverReducer from './get-driver/get-driver-reducer';
import getRSUsListReducer from './get-rsus-list/get-rsus-list-reducer';
import getCarsListReducer from './get-cars-list/get-cars-list-reducer';

export const rootReducer = combineReducers({
	getCars: getCarsReducer,
	getCarsList: getCarsListReducer,
	getCar: getCarReducer,
	createCar: createCarReducer,
	updateCar: updateCarReducer,
	deleteCar: deleteCarReducer,
	getDrivers: getDriversReducer,
	// getDriversList: getDriversListReducer,
	getDriver: getDriverReducer,
	createDriver: createDriverReducer,
	updateDriver: updateDriverReducer,
	deleteDriver: deleteDriverReducer,
	getCameras: getCamerasReducer,
	// getCamerasList: getCamerasListReducer,
	getCamera: getCameraReducer,
	createCamera: createCameraReducer,
	updateCamera: updateCameraReducer,
	deleteCamera: deleteCameraReducer,
	getRSUs: getRSUsReducer,
	getRSUsList: getRSUsListReducer,
	getRSU: getRSUReducer,
	createRSU: createRSUReducer,
	updateRSU: updateRSUReducer,
	deleteRSU: deleteRSUReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
