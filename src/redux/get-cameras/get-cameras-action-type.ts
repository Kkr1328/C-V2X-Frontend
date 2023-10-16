import { FeatureKeys } from '../featureKeys';

type GetCamerasTypes = {
	GET_CAMERAS_FETCH: string;
};

export default <GetCamerasTypes>{
	GET_CAMERAS_FETCH: `${FeatureKeys.GET_CAMERAS}/FETCH`,
};
