import { FeatureKeys } from '../featureKeys';

type UpdateEmergencyTypes = {
	UPDATE_EMERGENCY_FETCH: string;
};

export default <UpdateEmergencyTypes>{
	UPDATE_EMERGENCY_FETCH: `${FeatureKeys.UPDATE_EMERGENCY}/FETCH`,
};
