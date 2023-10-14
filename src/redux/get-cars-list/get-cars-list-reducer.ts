import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-cars-list-state';
import { FETCH_GET_CARS_LIST } from './get-cars-list-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCarsListReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CARS_LIST.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_CARS_LIST.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload };
		})
		.addCase(FETCH_GET_CARS_LIST.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCarsListReducer;
