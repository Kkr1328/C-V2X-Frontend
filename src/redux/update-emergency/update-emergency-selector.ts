import { RootState } from '../rootReducer';

export const selectUpdateEmergency = (state: RootState) =>
	state.updateEmergency;
