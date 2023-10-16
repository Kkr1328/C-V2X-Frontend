import { FeatureKeys } from '../featureKeys';

type CreateDriverTypes = {
	CREATE_DRIVER_FETCH: string;
};

export default <CreateDriverTypes>{
	CREATE_DRIVER_FETCH: `${FeatureKeys.CREATE_DRIVER}/FETCH`,
};
