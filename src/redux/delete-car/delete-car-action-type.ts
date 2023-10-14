import { FeatureKeys } from '../featureKeys';

type DeleteCarTypes = {
	DELETE_CAR_FETCH: string;
};

export default <DeleteCarTypes>{
	DELETE_CAR_FETCH: `${FeatureKeys.DELETE_CAR}/FETCH`,
};
