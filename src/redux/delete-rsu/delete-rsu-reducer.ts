import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './delete-rsu-state';
import { FETCH_DELETE_RSU } from './delete-rsu-action';
import { ErrorCommon } from '@/types/common/error.model';

const deleteRSUReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_DELETE_RSU.pending, (state) => ({
			...state,
			loading: true,
		}))
		.addCase(FETCH_DELETE_RSU.fulfilled, (state) => ({
			...state,
			loading: false,
			error: undefined,
		}))
		.addCase(FETCH_DELETE_RSU.rejected, (state, action) => ({
			...state,
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default deleteRSUReducer;
