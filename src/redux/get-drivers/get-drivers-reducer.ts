import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-drivers-state';
import { FETCH_GET_DRIVERS } from './get-drivers-action';
import { ErrorCommon } from '@/types/common/error.model';

const getDriversReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_DRIVERS.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_DRIVERS.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload };
		})
		.addCase(FETCH_GET_DRIVERS.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getDriversReducer;
