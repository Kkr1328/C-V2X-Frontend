import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './create-rsu-state';
import { FETCH_CREATE_RSU } from './create-rsu-action';
import { ErrorCommon } from '@/types/common/error.model';

const createRSUReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_CREATE_RSU.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_CREATE_RSU.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_CREATE_RSU.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default createRSUReducer;
