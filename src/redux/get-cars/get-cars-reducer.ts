import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-cars-state';
import { FETCH_GET_CARS } from './get-cars-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCarsReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CARS.pending, (state) => ({ ...state, loading: true }))
		.addCase(FETCH_GET_CARS.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_CARS.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCarsReducer;
