import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './update-emergency-state';
import { ErrorCommon } from '@/types/common/error.model';
import { FETCH_UPDATE_EMERGENCY } from './update-emergency-action';

const updateEmergencyReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_UPDATE_EMERGENCY.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_UPDATE_EMERGENCY.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_UPDATE_EMERGENCY.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default updateEmergencyReducer;
