import { FeatureKeys } from '../featureKeys';

type GetDriversTypes = {
	GET_DRIVERS_FETCH: string;
};

export default <GetDriversTypes>{
	GET_DRIVERS_FETCH: `${FeatureKeys.GET_DRIVERS}/FETCH`,
};
