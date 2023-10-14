import { FeatureKeys } from '../featureKeys';

type CreateCarTypes = {
	CREATE_CAR_FETCH: string;
};

export default <CreateCarTypes>{
	CREATE_CAR_FETCH: `${FeatureKeys.CREATE_CAR}/FETCH`,
};
