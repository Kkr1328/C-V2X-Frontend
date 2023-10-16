import { FeatureKeys } from '../featureKeys';

type GetDriversListTypes = {
	GET_DRIVERS_LIST_FETCH: string;
};

export default <GetDriversListTypes>{
	GET_DRIVERS_LIST_FETCH: `${FeatureKeys.GET_DRIVERS_LIST}/FETCH`,
};
