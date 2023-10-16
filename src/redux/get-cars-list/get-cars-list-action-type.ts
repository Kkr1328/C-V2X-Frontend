import { FeatureKeys } from '../featureKeys';

type GetCarsListTypes = {
	GET_CARS_LIST_FETCH: string;
};

export default <GetCarsListTypes>{
	GET_CARS_LIST_FETCH: `${FeatureKeys.GET_CARS_LIST}/FETCH`,
};
