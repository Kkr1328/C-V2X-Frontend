import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './get-rsu-state';
import { FETCH_GET_RSU } from './get-rsu-action';
import { ErrorCommon } from '@/types/common/error.model';

const getRSUReducer = createReducer(initialState, (builder) =>
	builder
		.addCase(FETCH_GET_RSU.pending, (state) => ({ ...state, loading: true }))
		.addCase(FETCH_GET_RSU.fulfilled, (_, { payload }) => {
			return { loading: false, data: payload, error: undefined };
		})
		.addCase(FETCH_GET_RSU.rejected, (_, action) => ({
			loading: false,
			error: action.payload as ErrorCommon,
		}))
);

export default getRSUReducer;
