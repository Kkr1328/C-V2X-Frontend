import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './delete-car-state';
import { FETCH_DELETE_CAR } from './delete-car-action';
import { ErrorCommon } from '@/types/common/error.model';

const deleteCarReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_DELETE_CAR.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_DELETE_CAR.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_DELETE_CAR.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default deleteCarReducer;
