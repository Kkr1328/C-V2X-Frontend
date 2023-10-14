import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-driver-state';
import { FETCH_GET_DRIVER } from './get-driver-action';
import { ErrorCommon } from '@/types/common/error.model';

const getDriverReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_DRIVER.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_DRIVER.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload };
		})
		.addCase(FETCH_GET_DRIVER.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getDriverReducer;
