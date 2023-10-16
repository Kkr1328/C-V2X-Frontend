import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './update-car-state';
import { ErrorCommon } from '@/types/common/error.model';
import { FETCH_UPDATE_CAR } from './update-car-action';

const updateCarReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_UPDATE_CAR.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_UPDATE_CAR.fulfilled, (state) => ({
			...state,
			loading: false,
		}))
		.addCase(FETCH_UPDATE_CAR.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default updateCarReducer;
