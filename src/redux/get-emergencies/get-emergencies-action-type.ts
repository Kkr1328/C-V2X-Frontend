import { FeatureKeys } from '../featureKeys';

type GetEmergenciesTypes = {
	GET_EMERGENCIES_FETCH: string;
};

export default <GetEmergenciesTypes>{
	GET_EMERGENCIES_FETCH: `${FeatureKeys.GET_EMERGENCIES}/FETCH`,
};
