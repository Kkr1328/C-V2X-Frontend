import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-car-state';
import { FETCH_GET_CAR } from './get-car-action';
import { ErrorCommon } from '@/types/common/error.model';

const getCarReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_CAR.pending, (state) => ({ ...state, loading: true }))
		.addCase(FETCH_GET_CAR.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload };
		})
		.addCase(FETCH_GET_CAR.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getCarReducer;
