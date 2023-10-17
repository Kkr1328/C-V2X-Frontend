import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './update-driver-state';
import { ErrorCommon } from '@/types/common/error.model';
import { FETCH_UPDATE_DRIVER } from './update-driver-action';

const updateDriverReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_UPDATE_DRIVER.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_UPDATE_DRIVER.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_UPDATE_DRIVER.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default updateDriverReducer;
