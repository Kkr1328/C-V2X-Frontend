import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './create-car-state';
import { FETCH_CREATE_CAR } from './create-car-action';
import { ErrorCommon } from '@/types/common/error.model';

const createCarReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_CREATE_CAR.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_CREATE_CAR.fulfilled, (state) => ({
			...state,
			loading: false,
		}))
		.addCase(FETCH_CREATE_CAR.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default createCarReducer;
