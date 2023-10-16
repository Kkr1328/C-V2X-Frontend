import { FeatureKeys } from '../featureKeys';

type GetCamerasListTypes = {
	GET_CAMERAS_LIST_FETCH: string;
};

export default <GetCamerasListTypes>{
	GET_CAMERAS_LIST_FETCH: `${FeatureKeys.GET_CAMERAS_LIST}/FETCH`,
};
