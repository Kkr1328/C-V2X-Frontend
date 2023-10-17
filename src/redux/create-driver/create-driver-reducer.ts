import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './create-driver-state';
import { FETCH_CREATE_DRIVER } from './create-driver-action';
import { ErrorCommon } from '@/types/common/error.model';

const createDriverReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_CREATE_DRIVER.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_CREATE_DRIVER.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_CREATE_DRIVER.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default createDriverReducer;
