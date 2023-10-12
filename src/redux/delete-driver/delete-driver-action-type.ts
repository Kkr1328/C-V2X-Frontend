import { FeatureKeys } from '../featureKeys';

type DeleteDriverTypes = {
	DELETE_DRIVER_FETCH: string;
};

export default <DeleteDriverTypes>{
	DELETE_DRIVER_FETCH: `${FeatureKeys.DELETE_DRIVER}/FETCH`,
};
