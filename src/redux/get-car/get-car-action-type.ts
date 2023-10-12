import { FeatureKeys } from '../featureKeys';

type GetCarTypes = {
	GET_CAR_FETCH: string;
};

export default <GetCarTypes>{
	GET_CAR_FETCH: `${FeatureKeys.GET_CAR}/FETCH`,
};
