import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './delete-driver-state';
import { FETCH_DELETE_DRIVER } from './delete-driver-action';
import { ErrorCommon } from '@/types/common/error.model';

const deleteDriverReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_DELETE_DRIVER.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_DELETE_DRIVER.fulfilled, (state) => ({
			...state,
			loading: false,
		}))
		.addCase(FETCH_DELETE_DRIVER.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default deleteDriverReducer;
