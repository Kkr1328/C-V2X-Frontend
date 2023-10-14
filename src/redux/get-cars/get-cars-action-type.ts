import { FeatureKeys } from '../featureKeys';

type GetCarsTypes = {
	GET_CARS_FETCH: string;
};

export default <GetCarsTypes>{
	GET_CARS_FETCH: `${FeatureKeys.GET_CARS}/FETCH`,
};
