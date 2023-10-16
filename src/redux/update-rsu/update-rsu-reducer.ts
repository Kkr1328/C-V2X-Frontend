import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './update-rsu-state';
import { ErrorCommon } from '@/types/common/error.model';
import { FETCH_UPDATE_RSU } from './update-rsu-action';

const updateRSUReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_UPDATE_RSU.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_UPDATE_RSU.fulfilled, (state) => ({
			...state,
			loading: false,
		}))
		.addCase(FETCH_UPDATE_RSU.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default updateRSUReducer;
