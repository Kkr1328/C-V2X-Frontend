import { FeatureKeys } from '../featureKeys';

type DeleteCameraTypes = {
	DELETE_CAMERA_FETCH: string;
};

export default <DeleteCameraTypes>{
	DELETE_CAMERA_FETCH: `${FeatureKeys.DELETE_CAMERA}/FETCH`,
};
