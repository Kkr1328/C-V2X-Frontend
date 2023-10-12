import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-drivers-list-state';
import { FETCH_GET_DRIVERS_LIST } from './get-drivers-list-action';
import { ErrorCommon } from '@/types/common/error.model';

const getDriversListReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_DRIVERS_LIST.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_GET_DRIVERS_LIST.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload };
		})
		.addCase(FETCH_GET_DRIVERS_LIST.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getDriversListReducer;
