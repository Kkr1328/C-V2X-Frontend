import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-emergencies-state';
import { FETCH_GET_EMERGENCIES } from './get-emergencies-action';
import { ErrorCommon } from '@/types/common/error.model';

const getEmergenciesReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_EMERGENCIES.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_EMERGENCIES.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_EMERGENCIES.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getEmergenciesReducer;
